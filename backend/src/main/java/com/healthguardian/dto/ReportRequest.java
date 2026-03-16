package com.healthguardian.dto;

import jakarta.validation.constraints.NotBlank;

public class ReportRequest {

    @NotBlank(message = "Report text cannot be blank")
    private String reportText;

    private String reportType;

    public ReportRequest() {}

    public ReportRequest(String reportText, String reportType) {
        this.reportText = reportText;
        this.reportType = reportType;
    }

    public String getReportText() { return reportText; }
    public void setReportText(String reportText) { this.reportText = reportText; }
    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }
}
