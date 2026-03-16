import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 second timeout for AI responses
});

export const analyzeSymptoms = async (symptoms, age, gender) => {
    const response = await api.post('/symptoms/analyze', {
        symptoms,
        age: age || '',
        gender: gender || '',
    });
    return response.data;
};

export const analyzeReport = async (reportText, reportType) => {
    const response = await api.post('/reports/analyze', {
        reportText,
        reportType: reportType || '',
    });
    return response.data;
};

export const getHealthAdvice = async (condition, age, gender) => {
    const response = await api.post('/advice', {
        condition,
        age: age || '',
        gender: gender || '',
    });
    return response.data;
};

export default api;
