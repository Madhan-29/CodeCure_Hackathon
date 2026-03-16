package com.healthguardian.dto;

import java.util.List;

public class SymptomResponse {

    private List<PredictedCondition> predictions;
    private String overallRiskLevel;
    private String disclaimer;

    public SymptomResponse() {}

    public SymptomResponse(List<PredictedCondition> predictions, String overallRiskLevel, String disclaimer) {
        this.predictions = predictions;
        this.overallRiskLevel = overallRiskLevel;
        this.disclaimer = disclaimer;
    }

    public List<PredictedCondition> getPredictions() { return predictions; }
    public void setPredictions(List<PredictedCondition> predictions) { this.predictions = predictions; }
    public String getOverallRiskLevel() { return overallRiskLevel; }
    public void setOverallRiskLevel(String overallRiskLevel) { this.overallRiskLevel = overallRiskLevel; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }

    public static class PredictedCondition {
        private String condition;
        private String probability;
        private String riskLevel;
        private String description;
        private List<String> recommendations;

        public PredictedCondition() {}

        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }
        public String getProbability() { return probability; }
        public void setProbability(String probability) { this.probability = probability; }
        public String getRiskLevel() { return riskLevel; }
        public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<String> getRecommendations() { return recommendations; }
        public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }
    }
}
