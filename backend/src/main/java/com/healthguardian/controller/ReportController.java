package com.healthguardian.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthguardian.dto.ReportRequest;
import com.healthguardian.dto.ReportResponse;
import com.healthguardian.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public ReportController(GeminiService geminiService, ObjectMapper objectMapper) {
        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeReport(@Valid @RequestBody ReportRequest request) {
        try {
            String aiResponse = geminiService.analyzeReport(
                    request.getReportText(),
                    request.getReportType()
            );
            ReportResponse response = objectMapper.readValue(aiResponse, ReportResponse.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of(
                            "error", "Failed to analyze report",
                            "message", e.getMessage()
                    ));
        }
    }
}
