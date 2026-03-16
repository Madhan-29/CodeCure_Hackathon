package com.healthguardian.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthguardian.dto.AdviceRequest;
import com.healthguardian.dto.AdviceResponse;
import com.healthguardian.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/advice")
public class HealthAdviceController {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public HealthAdviceController(GeminiService geminiService, ObjectMapper objectMapper) {
        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public ResponseEntity<?> getHealthAdvice(@Valid @RequestBody AdviceRequest request) {
        try {
            String aiResponse = geminiService.getHealthAdvice(
                    request.getCondition(),
                    request.getAge(),
                    request.getGender()
            );
            AdviceResponse response = objectMapper.readValue(aiResponse, AdviceResponse.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of(
                            "error", "Failed to get health advice",
                            "message", e.getMessage()
                    ));
        }
    }
}
