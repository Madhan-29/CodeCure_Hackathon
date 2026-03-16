package com.healthguardian.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class GeminiService {

    private final WebClient geminiWebClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String apiKey;

    public GeminiService(WebClient geminiWebClient, ObjectMapper objectMapper) {
        this.geminiWebClient = geminiWebClient;
        this.objectMapper = objectMapper;
    }

    /**
     * Analyze symptoms and predict possible conditions
     */
    public String analyzeSymptoms(List<String> symptoms, String age, String gender) {
        String prompt = buildSymptomPrompt(symptoms, age, gender);
        return callGeminiApi(prompt);
    }

    /**
     * Analyze medical report text
     */
    public String analyzeReport(String reportText, String reportType) {
        String prompt = buildReportPrompt(reportText, reportType);
        return callGeminiApi(prompt);
    }

    /**
     * Get preventive care advice for a condition
     */
    public String getHealthAdvice(String condition, String age, String gender) {
        String prompt = buildAdvicePrompt(condition, age, gender);
        return callGeminiApi(prompt);
    }

    private String buildSymptomPrompt(List<String> symptoms, String age, String gender) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are an experienced medical diagnostic AI. Your job is to analyze patient symptoms and predict the MOST LIKELY health conditions with REALISTIC risk assessments.\n\n");
        sb.append("CRITICAL INSTRUCTIONS:\n");
        sb.append("- Assess risk levels REALISTICALLY based on symptom combinations and severity.\n");
        sb.append("- Do NOT default everything to 'low'. Many symptom combinations indicate moderate or high risk.\n");
        sb.append("- If symptoms strongly correlate with a serious condition (e.g., frequent urination + excessive thirst = diabetes risk), mark it as HIGH.\n");
        sb.append("- If symptoms partially match a condition, mark it as MODERATE.\n");
        sb.append("- Only mark as LOW if the correlation is weak.\n");
        sb.append("- The overallRiskLevel should reflect the HIGHEST individual risk found.\n");
        sb.append("- Be medically accurate and helpful — this is an educational health screening tool.\n\n");
        sb.append("Patient Info:\n");
        if (age != null && !age.isEmpty()) sb.append("- Age: ").append(age).append("\n");
        if (gender != null && !gender.isEmpty()) sb.append("- Gender: ").append(gender).append("\n");
        sb.append("\nSymptoms reported:\n");
        for (String symptom : symptoms) {
            sb.append("- ").append(symptom).append("\n");
        }
        sb.append("\nProvide your response in STRICT JSON format (no markdown, no code blocks, just pure JSON):\n");
        sb.append("{\n");
        sb.append("  \"predictions\": [\n");
        sb.append("    {\n");
        sb.append("      \"condition\": \"Name of the condition\",\n");
        sb.append("      \"probability\": \"High/Moderate/Low\",\n");
        sb.append("      \"riskLevel\": \"high/moderate/low\",\n");
        sb.append("      \"description\": \"Brief explanation of why these symptoms suggest this condition\",\n");
        sb.append("      \"recommendations\": [\"Specific action item 1\", \"Specific action item 2\", \"Specific action item 3\"]\n");
        sb.append("    }\n");
        sb.append("  ],\n");
        sb.append("  \"overallRiskLevel\": \"high/moderate/low\",\n");
        sb.append("  \"disclaimer\": \"This is an AI-based screening tool for educational purposes only. It is NOT a substitute for professional medical diagnosis. Please consult a qualified healthcare provider for proper evaluation and treatment.\"\n");
        sb.append("}\n\n");
        sb.append("IMPORTANT: Provide 3-4 possible conditions with VARIED risk levels (not all the same). At least one should be moderate or high if symptoms warrant it. Return ONLY the JSON object, no additional text.");
        return sb.toString();
    }

    private String buildReportPrompt(String reportText, String reportType) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are a medical AI assistant that helps patients understand their medical reports.\n\n");
        sb.append("Analyze the following medical report");
        if (reportType != null && !reportType.isEmpty()) {
            sb.append(" (").append(reportType).append(")");
        }
        sb.append(":\n\n");
        sb.append(reportText);
        sb.append("\n\nProvide your response in STRICT JSON format (no markdown, no code blocks, just pure JSON):\n");
        sb.append("{\n");
        sb.append("  \"summary\": \"Brief summary of the report in simple terms\",\n");
        sb.append("  \"findings\": [\n");
        sb.append("    {\n");
        sb.append("      \"parameter\": \"Test parameter name\",\n");
        sb.append("      \"value\": \"Patient's value\",\n");
        sb.append("      \"normalRange\": \"Normal range\",\n");
        sb.append("      \"status\": \"normal/abnormal/borderline\",\n");
        sb.append("      \"explanation\": \"What this means in simple terms\"\n");
        sb.append("    }\n");
        sb.append("  ],\n");
        sb.append("  \"abnormalValues\": [\"List of abnormal parameters\"],\n");
        sb.append("  \"overallAssessment\": \"Overall health assessment in simple language\",\n");
        sb.append("  \"disclaimer\": \"Medical disclaimer text\"\n");
        sb.append("}\n\n");
        sb.append("IMPORTANT: Explain everything in simple, easy-to-understand language suitable for patients. Always include a medical disclaimer. Return ONLY the JSON object.");
        return sb.toString();
    }

    private String buildAdvicePrompt(String condition, String age, String gender) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are a preventive health care advisor. Provide comprehensive preventive care advice for:\n\n");
        sb.append("Condition: ").append(condition).append("\n");
        if (age != null && !age.isEmpty()) sb.append("Age: ").append(age).append("\n");
        if (gender != null && !gender.isEmpty()) sb.append("Gender: ").append(gender).append("\n");
        sb.append("\nProvide your response in STRICT JSON format (no markdown, no code blocks, just pure JSON):\n");
        sb.append("{\n");
        sb.append("  \"condition\": \"").append(condition).append("\",\n");
        sb.append("  \"adviceCategories\": [\n");
        sb.append("    {\n");
        sb.append("      \"category\": \"Diet & Nutrition\",\n");
        sb.append("      \"icon\": \"🥗\",\n");
        sb.append("      \"tips\": [\"Tip 1\", \"Tip 2\", \"Tip 3\"]\n");
        sb.append("    },\n");
        sb.append("    {\n");
        sb.append("      \"category\": \"Exercise & Activity\",\n");
        sb.append("      \"icon\": \"🏃\",\n");
        sb.append("      \"tips\": [\"Tip 1\", \"Tip 2\"]\n");
        sb.append("    },\n");
        sb.append("    {\n");
        sb.append("      \"category\": \"Health Monitoring\",\n");
        sb.append("      \"icon\": \"📊\",\n");
        sb.append("      \"tips\": [\"Tip 1\", \"Tip 2\"]\n");
        sb.append("    },\n");
        sb.append("    {\n");
        sb.append("      \"category\": \"Lifestyle Changes\",\n");
        sb.append("      \"icon\": \"🌟\",\n");
        sb.append("      \"tips\": [\"Tip 1\", \"Tip 2\"]\n");
        sb.append("    }\n");
        sb.append("  ],\n");
        sb.append("  \"warningSignsToWatch\": [\"Warning sign 1\", \"Warning sign 2\"],\n");
        sb.append("  \"disclaimer\": \"Medical disclaimer text\"\n");
        sb.append("}\n\n");
        sb.append("IMPORTANT: Provide practical, actionable advice. Include 4 categories minimum. Always include a medical disclaimer. Return ONLY the JSON object.");
        return sb.toString();
    }

    private String callGeminiApi(String prompt) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            List<Map<String, Object>> parts = new ArrayList<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);
            content.put("parts", parts);
            contents.add(content);
            requestBody.put("contents", contents);

            // Add generation config for JSON
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.7);
            generationConfig.put("topP", 0.95);
            generationConfig.put("topK", 40);
            generationConfig.put("maxOutputTokens", 4096);
            requestBody.put("generationConfig", generationConfig);

            String response = geminiWebClient.post()
                    .uri("?key=" + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // Parse Gemini response to extract the text
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode candidates = rootNode.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                String text = candidates.get(0)
                        .path("content")
                        .path("parts")
                        .get(0)
                        .path("text")
                        .asText();

                // Clean any markdown formatting from the response
                text = text.trim();
                if (text.startsWith("```json")) {
                    text = text.substring(7);
                }
                if (text.startsWith("```")) {
                    text = text.substring(3);
                }
                if (text.endsWith("```")) {
                    text = text.substring(0, text.length() - 3);
                }
                return text.trim();
            }

            return "{}";
        } catch (Exception e) {
            return "{\"error\": \"Failed to get AI response: " + e.getMessage().replace("\"", "'") + "\"}";
        }
    }
}
