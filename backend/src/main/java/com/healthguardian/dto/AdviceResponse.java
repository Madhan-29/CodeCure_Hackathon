package com.healthguardian.dto;

import java.util.List;

public class AdviceResponse {

    private String condition;
    private List<AdviceCategory> adviceCategories;
    private List<String> warningSignsToWatch;
    private String disclaimer;

    public AdviceResponse() {}

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public List<AdviceCategory> getAdviceCategories() { return adviceCategories; }
    public void setAdviceCategories(List<AdviceCategory> adviceCategories) { this.adviceCategories = adviceCategories; }
    public List<String> getWarningSignsToWatch() { return warningSignsToWatch; }
    public void setWarningSignsToWatch(List<String> warningSignsToWatch) { this.warningSignsToWatch = warningSignsToWatch; }
    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }

    public static class AdviceCategory {
        private String category;
        private String icon;
        private List<String> tips;

        public AdviceCategory() {}

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
        public List<String> getTips() { return tips; }
        public void setTips(List<String> tips) { this.tips = tips; }
    }
}
