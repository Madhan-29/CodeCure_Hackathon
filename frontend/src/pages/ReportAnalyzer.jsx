import { useState, useRef } from 'react';
import { analyzeReport } from '../services/api';
import './ReportAnalyzer.css';

function ReportAnalyzer() {
    const [reportText, setReportText] = useState('');
    const [reportType, setReportType] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [ocrLoading, setOcrLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // For image files, try OCR via Tesseract.js
        if (file.type.startsWith('image/')) {
            setOcrLoading(true);
            setError('');
            try {
                // Dynamic import of Tesseract
                const Tesseract = await import('tesseract.js');
                const result = await Tesseract.recognize(file, 'eng', {
                    logger: () => { },
                });
                setReportText(result.data.text);
            } catch (err) {
                setError('OCR failed. Please paste the report text manually.');
                console.error(err);
            } finally {
                setOcrLoading(false);
            }
        } else if (file.type === 'text/plain') {
            const text = await file.text();
            setReportText(text);
        } else {
            setError('Please upload an image file (JPG, PNG) or a text file.');
        }
    };

    const handleAnalyze = async () => {
        if (!reportText.trim()) {
            setError('Please enter or upload report text');
            return;
        }
        setError('');
        setLoading(true);
        setResults(null);

        try {
            const data = await analyzeReport(reportText, reportType);
            setResults(data);
        } catch (err) {
            setError('Failed to analyze report. Please ensure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setReportText('');
        setReportType('');
        setResults(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getStatusClass = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'abnormal') return 'status-abnormal';
        if (s === 'borderline') return 'status-borderline';
        return 'status-normal';
    };

    return (
        <div className="report-page page-enter">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">
                        📋 <span className="gradient-text">Report Analyzer</span>
                    </h1>
                    <p className="section-subtitle">
                        Upload or paste your medical report and get AI-powered insights in simple language.
                    </p>
                </div>

                <div className="report-layout">
                    {/* Input Section */}
                    <div className="input-section glass-card">
                        <h3>Upload or Paste Your Report</h3>

                        {/* File Upload */}
                        <div
                            className="upload-zone"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) {
                                    const dt = new DataTransfer();
                                    dt.items.add(file);
                                    fileInputRef.current.files = dt.files;
                                    handleFileUpload({ target: { files: [file] } });
                                }
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*,.txt"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            {ocrLoading ? (
                                <div className="upload-loading">
                                    <div className="spinner"></div>
                                    <p>Extracting text from image...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="upload-icon">📄</div>
                                    <p className="upload-title">Click or drag & drop your report</p>
                                    <p className="upload-hint">Supports JPG, PNG images and TXT files</p>
                                </>
                            )}
                        </div>

                        <div className="divider-text">
                            <span>or paste the text directly</span>
                        </div>

                        {/* Text Input */}
                        <textarea
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                            placeholder="Paste your medical report text here...&#10;&#10;e.g.&#10;Hemoglobin: 12.5 g/dL&#10;Fasting Blood Sugar: 140 mg/dL&#10;Cholesterol: 250 mg/dL"
                            rows={8}
                            id="report-text"
                        />

                        {/* Report Type */}
                        <div className="field-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="report-type">Report Type (optional)</label>
                            <select id="report-type" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                <option value="">Select report type</option>
                                <option value="Blood Test">Blood Test (CBC)</option>
                                <option value="Lipid Profile">Lipid Profile</option>
                                <option value="Liver Function">Liver Function Test</option>
                                <option value="Kidney Function">Kidney Function Test</option>
                                <option value="Thyroid Profile">Thyroid Profile</option>
                                <option value="Diabetes Panel">Diabetes Panel (HbA1c)</option>
                                <option value="Urine Test">Urine Test</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {error && <div className="error-msg">{error}</div>}

                        <div className="action-buttons">
                            <button
                                className="btn-primary analyze-btn"
                                onClick={handleAnalyze}
                                disabled={loading || !reportText.trim()}
                                id="analyze-report-button"
                            >
                                {loading ? (
                                    <>
                                        <span className="btn-spinner"></span>
                                        Analyzing Report...
                                    </>
                                ) : (
                                    <>🔍 Analyze Report</>
                                )}
                            </button>
                            {(reportText || results) && (
                                <button className="btn-secondary" onClick={handleReset}>
                                    🔄 Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>AI is analyzing your report...</p>
                        </div>
                    )}

                    {results && (
                        <div className="results-section">
                            {/* Summary */}
                            <div className="report-summary glass-card">
                                <h3>📊 Report Summary</h3>
                                <p>{results.summary}</p>
                            </div>

                            {/* Overall Assessment */}
                            {results.overallAssessment && (
                                <div className="assessment glass-card">
                                    <h3>🏥 Overall Assessment</h3>
                                    <p>{results.overallAssessment}</p>
                                </div>
                            )}

                            {/* Abnormal Values Alert */}
                            {results.abnormalValues && results.abnormalValues.length > 0 && (
                                <div className="abnormal-alert glass-card">
                                    <h3>🚨 Abnormal Values Detected</h3>
                                    <div className="abnormal-tags">
                                        {results.abnormalValues.map((val, i) => (
                                            <span key={i} className="risk-tag high">{val}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Findings Table */}
                            {results.findings && results.findings.length > 0 && (
                                <div className="findings-section glass-card">
                                    <h3>📋 Detailed Findings</h3>
                                    <div className="findings-table-wrapper">
                                        <table className="findings-table">
                                            <thead>
                                                <tr>
                                                    <th>Parameter</th>
                                                    <th>Value</th>
                                                    <th>Normal Range</th>
                                                    <th>Status</th>
                                                    <th>Explanation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.findings.map((f, i) => (
                                                    <tr key={i} className={getStatusClass(f.status)}>
                                                        <td className="param-name">{f.parameter}</td>
                                                        <td className="param-value">{f.value}</td>
                                                        <td>{f.normalRange}</td>
                                                        <td>
                                                            <span className={`status-badge ${getStatusClass(f.status)}`}>
                                                                {f.status}
                                                            </span>
                                                        </td>
                                                        <td className="explanation">{f.explanation}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default ReportAnalyzer;
