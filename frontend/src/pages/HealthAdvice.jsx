import { useState } from 'react';
import { getHealthAdvice } from '../services/api';
import './HealthAdvice.css';

function HealthAdvice() {
    const [condition, setCondition] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const commonConditions = [
        { name: 'Diabetes (Type 2)', icon: '🩸' },
        { name: 'Hypertension', icon: '❤️' },
        { name: 'Heart Disease', icon: '🫀' },
        { name: 'Kidney Disease', icon: '🫘' },
        { name: 'Thyroid Disorder', icon: '🦋' },
        { name: 'Anemia', icon: '🔴' },
        { name: 'High Cholesterol', icon: '🧈' },
        { name: 'PCOS', icon: '🩺' },
    ];

    const handleGetAdvice = async (conditionName) => {
        const target = conditionName || condition;
        if (!target.trim()) {
            setError('Please enter or select a condition');
            return;
        }
        setCondition(target);
        setError('');
        setLoading(true);
        setResults(null);

        try {
            const data = await getHealthAdvice(target, age, gender);
            setResults(data);
        } catch (err) {
            setError('Failed to get health advice. Please ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="advice-page page-enter">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">
                        💊 <span className="gradient-text">Preventive Care Advisor</span>
                    </h1>
                    <p className="section-subtitle">
                        Get personalized lifestyle and preventive care advice for any health condition.
                    </p>
                </div>

                <div className="advice-layout">
                    {/* Input Section */}
                    <div className="input-section glass-card">
                        <h3>Select or Enter a Condition</h3>

                        {/* Quick Select */}
                        <div className="quick-select">
                            {commonConditions.map((c, i) => (
                                <button
                                    key={i}
                                    className={`condition-btn ${condition === c.name ? 'active' : ''}`}
                                    onClick={() => {
                                        setCondition(c.name);
                                        handleGetAdvice(c.name);
                                    }}
                                    disabled={loading}
                                >
                                    <span>{c.icon}</span> {c.name}
                                </button>
                            ))}
                        </div>

                        <div className="divider-text">
                            <span>or type a condition</span>
                        </div>

                        <div className="symptom-input-row">
                            <input
                                type="text"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                placeholder="e.g. Diabetes, PCOS, Asthma..."
                                id="condition-input"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleGetAdvice();
                                }}
                            />
                            <button
                                className="btn-primary"
                                onClick={() => handleGetAdvice()}
                                disabled={loading || !condition.trim()}
                                id="get-advice-button"
                            >
                                {loading ? '...' : 'Get Advice'}
                            </button>
                        </div>

                        {/* Optional */}
                        <div className="optional-fields">
                            <div className="field-group">
                                <label htmlFor="advice-age">Age (optional)</label>
                                <input
                                    type="number"
                                    id="advice-age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="e.g. 30"
                                />
                            </div>
                            <div className="field-group">
                                <label htmlFor="advice-gender">Gender (optional)</label>
                                <select id="advice-gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {error && <div className="error-msg">{error}</div>}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>Generating personalized advice...</p>
                        </div>
                    )}

                    {/* Results */}
                    {results && (
                        <div className="advice-results">
                            <h2 className="advice-title">
                                Preventive Care Plan for <span className="gradient-text">{results.condition}</span>
                            </h2>

                            {/* Advice Categories */}
                            <div className="advice-grid">
                                {results.adviceCategories && results.adviceCategories.map((cat, i) => (
                                    <div key={i} className="advice-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                                        <div className="advice-card-header">
                                            <span className="advice-icon">{cat.icon}</span>
                                            <h3>{cat.category}</h3>
                                        </div>
                                        <ul className="advice-tips">
                                            {cat.tips && cat.tips.map((tip, j) => (
                                                <li key={j}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Warning Signs */}
                            {results.warningSignsToWatch && results.warningSignsToWatch.length > 0 && (
                                <div className="warning-signs glass-card">
                                    <h3>🚨 Warning Signs to Watch</h3>
                                    <div className="warning-list">
                                        {results.warningSignsToWatch.map((sign, i) => (
                                            <div key={i} className="warning-item">
                                                <span className="warning-dot"></span>
                                                {sign}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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

export default HealthAdvice;
