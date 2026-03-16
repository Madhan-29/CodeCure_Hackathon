package com.healthguardian.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthguardian.dto.SymptomRequest;
import com.healthguardian.dto.SymptomResponse;
import com.healthguardian.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/symptoms")
public class SymptomController {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public SymptomController(GeminiService geminiService, ObjectMapper objectMapper) {
        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeSymptoms(@Valid @RequestBody SymptomRequest request) {
        try {
            String aiResponse = geminiService.analyzeSymptoms(
                    request.getSymptoms(),
                    request.getAge(),
                    request.getGender()
            );
            SymptomResponse response = objectMapper.readValue(aiResponse, SymptomResponse.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of(
                            "error", "Failed to analyze symptoms",
                            "message", e.getMessage()
                    ));
        }
    }
}
