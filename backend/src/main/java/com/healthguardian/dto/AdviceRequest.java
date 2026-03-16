package com.healthguardian.dto;

import jakarta.validation.constraints.NotBlank;

public class AdviceRequest {

    @NotBlank(message = "Condition cannot be blank")
    private String condition;

    private String age;
    private String gender;

    public AdviceRequest() {}

    public AdviceRequest(String condition, String age, String gender) {
        this.condition = condition;
        this.age = age;
        this.gender = gender;
    }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
