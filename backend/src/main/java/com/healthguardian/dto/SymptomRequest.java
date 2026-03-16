package com.healthguardian.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class SymptomRequest {

    @NotEmpty(message = "Symptoms list cannot be empty")
    private List<String> symptoms;

    private String age;
    private String gender;

    public SymptomRequest() {}

    public SymptomRequest(List<String> symptoms, String age, String gender) {
        this.symptoms = symptoms;
        this.age = age;
        this.gender = gender;
    }

    public List<String> getSymptoms() { return symptoms; }
    public void setSymptoms(List<String> symptoms) { this.symptoms = symptoms; }
    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
