# 🛡️ AI Health Guardian – Early Disease Detection & Care Assistant

> **An AI-powered health-tech solution that analyzes symptoms, interprets medical reports, and provides personalized preventive care — making healthcare accessible and understandable for everyone.**

Built for **Codecure @ SPIRIT 2026**, IIT (BHU) Varanasi 🏛️

---

## 🚨 Problem Statement

In India, millions of people:
- **Ignore early symptoms** until they become severe
- **Don't understand medical reports** filled with complex jargon
- **Visit doctors only after the disease has progressed**, leading to late detection

This leads to preventable complications from diseases like **Diabetes, Heart Disease, Kidney Problems, and Hypertension**.

## 💡 Our Solution

**AI Health Guardian** is a personal AI health assistant that:
1. 🩺 **Analyzes symptoms** to predict possible disease risks
2. 📋 **Interprets medical reports** in simple, easy-to-understand language
3. 💊 **Provides preventive care plans** with actionable lifestyle advice
4. 🚨 **Alerts users** about abnormal values and warning signs

> ⚠️ **Disclaimer**: This tool is for informational purposes only and is NOT a substitute for professional medical advice.

---

## 🧠 Core Features

### 1️⃣ AI Symptom Analyzer
- Enter symptoms like *"headache, fatigue, frequent urination"*
- AI predicts possible conditions with **probability levels** (High/Moderate/Low)
- Color-coded risk assessment (🔴 High, 🟡 Moderate, 🟢 Low)
- Get actionable recommendations for each condition

### 2️⃣ Medical Report Analyzer
- **Upload** report images (JPG/PNG) — OCR extracts text automatically
- **Paste** report text directly
- AI explains each parameter in **simple language**
- Highlights **abnormal values** with clear explanations
- Supports: Blood Tests, Lipid Profile, Liver/Kidney Function, Thyroid, Diabetes Panel, and more

### 3️⃣ Preventive Care Advisor
- Quick-select from **8 common conditions** (Diabetes, Hypertension, Heart Disease, etc.)
- AI generates personalized care plans across categories:
  - 🥗 Diet & Nutrition
  - 🏃 Exercise & Activity
  - 📊 Health Monitoring
  - 🌟 Lifestyle Changes
- Lists **warning signs to watch** for each condition

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | Fast, modern web interface |
| **Styling** | Vanilla CSS | Dark theme with glassmorphism & animations |
| **Backend** | Spring Boot 3.2 (Java 17) | RESTful API server |
| **AI Engine** | Google Gemini 2.0 Flash API | Medical symptom & report analysis |
| **OCR** | Tesseract.js | Client-side text extraction from report images |
| **HTTP Client** | Axios | Frontend API calls |
| **Database** | H2 (In-Memory) | Lightweight demo database |

---

## 📐 Architecture

```
┌──────────────────────────────────────┐
│          React Frontend              │
│   ┌──────────┐  ┌──────────────┐     │
│   │ Symptom  │  │   Report     │     │
│   │ Analyzer │  │  Analyzer    │     │
│   │   Page   │  │  (OCR +      │     │
│   │          │  │   Upload)    │     │
│   └────┬─────┘  └──────┬───────┘     │
│        │               │             │
│   ┌────▼───────────────▼───────┐     │
│   │     API Service (Axios)    │     │
│   └────────────┬───────────────┘     │
└────────────────┼─────────────────────┘
                 │ REST API (JSON)
┌────────────────▼─────────────────────┐
│       Spring Boot Backend            │
│   ┌──────────────────────────┐       │
│   │     REST Controllers     │       │
│   │  /api/symptoms/analyze   │       │
│   │  /api/reports/analyze    │       │
│   │  /api/advice             │       │
│   └────────────┬─────────────┘       │
│   ┌────────────▼─────────────┐       │
│   │     Gemini AI Service    │       │
│   │  (Prompt Engineering +   │       │
│   │   JSON Response Parsing) │       │
│   └────────────┬─────────────┘       │
└────────────────┼─────────────────────┘
                 │ HTTPS
        ┌────────▼────────┐
        │  Google Gemini  │
        │    2.0 Flash    │
        │      API        │
        └─────────────────┘
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Java 17+** (for Spring Boot backend)
- **Node.js 18+** & **npm** (for React frontend)
- **Google Gemini API Key** ([Get it free here](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-health-guardian.git
cd ai-health-guardian
```

### 2. Backend Setup
```bash
cd backend

# Add your Gemini API key
# Edit src/main/resources/application.properties
# Replace YOUR_GEMINI_API_KEY_HERE with your actual key

# Run the backend (Windows)
mvnw.cmd spring-boot:run

# Run the backend (Linux/Mac)
./mvnw spring-boot:run
```
The backend starts at `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```
The frontend starts at `http://localhost:5173`

### 4. Open the App
Navigate to `http://localhost:5173` in your browser and start using AI Health Guardian! 🎉

---

## 📁 Project Structure

```
ai-health-guardian/
├── backend/                        # Spring Boot Backend
│   ├── src/main/java/com/healthguardian/
│   │   ├── HealthGuardianApplication.java
│   │   ├── config/
│   │   │   ├── CorsConfig.java         # CORS configuration
│   │   │   └── GeminiConfig.java       # Gemini API WebClient config
│   │   ├── controller/
│   │   │   ├── SymptomController.java  # POST /api/symptoms/analyze
│   │   │   ├── ReportController.java   # POST /api/reports/analyze
│   │   │   └── HealthAdviceController.java  # POST /api/advice
│   │   ├── dto/                        # Request/Response DTOs
│   │   │   ├── SymptomRequest.java
│   │   │   ├── SymptomResponse.java
│   │   │   ├── ReportRequest.java
│   │   │   ├── ReportResponse.java
│   │   │   ├── AdviceRequest.java
│   │   │   └── AdviceResponse.java
│   │   └── service/
│   │       └── GeminiService.java      # AI integration with Gemini
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/                       # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.jsx & Home.css
│   │   │   ├── SymptomAnalyzer.jsx & .css
│   │   │   ├── ReportAnalyzer.jsx & .css
│   │   │   └── HealthAdvice.jsx & .css
│   │   ├── services/
│   │   │   └── api.js              # Axios API service
│   │   ├── App.jsx
│   │   ├── index.css               # Global design system
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🎨 UI Design

- **Dark Theme** with gradient accents (Cyan → Purple)
- **Glassmorphism** cards with backdrop blur
- **Smooth animations** and micro-interactions
- **Responsive** design for mobile and desktop
- **Color-coded risk levels** for intuitive understanding
- **Premium typography** using Inter font

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/symptoms/analyze` | Analyze symptoms and predict conditions |
| POST | `/api/reports/analyze` | Analyze medical report text |
| POST | `/api/advice` | Get preventive care advice for a condition |

---

## 🔮 Future Enhancements

- 🌐 **Multilingual Support** (Hindi, Tamil, Bengali, etc.)
- 🔊 **Voice Input** for symptoms
- 📱 **Mobile App** (React Native / Flutter)
- 📊 **Health Tracking Dashboard** with historical graphs
- 🏥 **Nearby Hospital Locator** integration
- 🔐 **User Authentication** and data encryption

---

## 👥 Team

Built with ❤️ for **Codecure @ SPIRIT 2026**, IIT (BHU) Varanasi

---

## 📄 License

This project is for educational and competition purposes. Not intended for clinical use.
