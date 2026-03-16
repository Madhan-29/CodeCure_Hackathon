package com.healthguardian.dto;

import java.util.List;

public class ReportResponse {

    private String summary;
    private List<ReportFinding> findings;
    private List<String> abnormalValues;
    private String overallAssessment;
    private String disclaimer;

    public ReportResponse() {}

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public List<ReportFinding> getFindings() { return findings; }
    public void setFindings(List<ReportFinding> findings) { this.findings = findings; }
    public List<String> getAbnormalValues() { return abnormalValues; }
    public void setAbnormalValues(List<String> abnormalValues) { this.abnormalValues = abnormalValues; }
    public String getOverallAssessment() { return overallAssessment; }
    public void setOverallAssessment(String overallAssessment) { this.overallAssessment = overallAssessment; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }

    public static class ReportFinding {
        private String parameter;
        private String value;
        private String normalRange;
        private String status;
        private String explanation;

        public ReportFinding() {}

        public String getParameter() { return parameter; }
        public void setParameter(String parameter) { this.parameter = parameter; }
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        public String getNormalRange() { return normalRange; }
        public void setNormalRange(String normalRange) { this.normalRange = normalRange; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }
}
