import { useState } from 'react';
import { analyzeSymptoms } from '../services/api';
import './SymptomAnalyzer.css';

function SymptomAnalyzer() {
    const [symptomInput, setSymptomInput] = useState('');
    const [symptoms, setSymptoms] = useState([]);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const addSymptom = () => {
        const parts = symptomInput
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s && !symptoms.includes(s));
        if (parts.length > 0) {
            setSymptoms([...symptoms, ...parts]);
            setSymptomInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSymptom();
        }
    };

    const removeSymptom = (index) => {
        setSymptoms(symptoms.filter((_, i) => i !== index));
    };

    const handleAnalyze = async () => {
        if (symptoms.length === 0) {
            setError('Please add at least one symptom');
            return;
        }
        setError('');
        setLoading(true);
        setResults(null);

        try {
            const data = await analyzeSymptoms(symptoms, age, gender);
            setResults(data);
        } catch (err) {
            setError('Failed to analyze symptoms. Please make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSymptoms([]);
        setAge('');
        setGender('');
        setResults(null);
        setError('');
    };

    const getRiskColor = (level) => {
        const l = (level || '').toLowerCase();
        if (l === 'high') return '#ef4444';
        if (l === 'moderate') return '#f59e0b';
        return '#10b981';
    };

    return (
        <div className="symptom-page page-enter">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">
                        🩺 <span className="gradient-text">Symptom Analyzer</span>
                    </h1>
                    <p className="section-subtitle">
                        Enter your symptoms below and our AI will predict possible health conditions.
                    </p>
                </div>

                <div className="analyzer-layout">
                    {/* Input Section */}
                    <div className="input-section glass-card">
                        <h3>Enter Your Symptoms</h3>

                        <div className="symptom-input-row">
                            <input
                                type="text"
                                value={symptomInput}
                                onChange={(e) => setSymptomInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="e.g. Headache, Fatigue, Fever..."
                                id="symptom-input"
                            />
                            <button className="btn-primary" onClick={addSymptom} type="button">
                                + Add
                            </button>
                        </div>

                        {/* Symptom Chips */}
                        {symptoms.length > 0 && (
                            <div className="symptom-chips">
                                {symptoms.map((s, i) => (
                                    <span key={i} className="symptom-chip">
                                        {s}
                                        <button onClick={() => removeSymptom(i)} className="chip-remove">×</button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Optional Info */}
                        <div className="optional-fields">
                            <div className="field-group">
                                <label htmlFor="age-input">Age (optional)</label>
                                <input
                                    type="number"
                                    id="age-input"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="e.g. 30"
                                    min="1"
                                    max="120"
                                />
                            </div>
                            <div className="field-group">
                                <label htmlFor="gender-select">Gender (optional)</label>
                                <select id="gender-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {error && <div className="error-msg">{error}</div>}

                        <div className="action-buttons">
                            <button
                                className="btn-primary analyze-btn"
                                onClick={handleAnalyze}
                                disabled={loading || symptoms.length === 0}
                                id="analyze-button"
                            >
                                {loading ? (
                                    <>
                                        <span className="btn-spinner"></span>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>🔍 Analyze Symptoms</>
                                )}
                            </button>
                            {(symptoms.length > 0 || results) && (
                                <button className="btn-secondary" onClick={handleReset}>
                                    🔄 Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Section */}
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>AI is analyzing your symptoms...</p>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>This may take a few seconds</p>
                        </div>
                    )}

                    {results && (
                        <div className="results-section">
                            {/* Overall Risk */}
                            <div className="overall-risk glass-card">
                                <div className="risk-header">
                                    <h3>Overall Risk Assessment</h3>
                                    <span className={`risk-tag ${(results.overallRiskLevel || 'low').toLowerCase()}`}>
                                        ● {results.overallRiskLevel || 'Low'}
                                    </span>
                                </div>
                            </div>

                            {/* Predictions */}
                            <div className="predictions-grid">
                                {results.predictions && results.predictions.map((pred, i) => (
                                    <div
                                        key={i}
                                        className="prediction-card glass-card"
                                        style={{ animationDelay: `${i * 0.1}s`, '--risk-color': getRiskColor(pred.riskLevel) }}
                                    >
                                        <div className="pred-header">
                                            <h4>{pred.condition}</h4>
                                            <span className={`risk-tag ${(pred.riskLevel || 'low').toLowerCase()}`}>
                                                {pred.probability} probability
                                            </span>
                                        </div>
                                        <p className="pred-desc">{pred.description}</p>
                                        {pred.recommendations && pred.recommendations.length > 0 && (
                                            <div className="pred-recs">
                                                <h5>💡 Recommendations</h5>
                                                <ul>
                                                    {pred.recommendations.map((rec, j) => (
                                                        <li key={j}>{rec}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Disclaimer */}
                            {results.disclaimer && (
                                <div className="disclaimer">{results.disclaimer}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SymptomAnalyzer;
