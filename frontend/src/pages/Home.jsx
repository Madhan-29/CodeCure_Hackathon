import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const features = [
        {
            icon: '🩺',
            title: 'AI Symptom Analyzer',
            description: 'Enter your symptoms and get AI-powered predictions of possible health conditions with risk assessment.',
            link: '/symptoms',
            color: '#06b6d4',
        },
        {
            icon: '📋',
            title: 'Medical Report Analyzer',
            description: 'Upload your medical reports and get easy-to-understand explanations of your test results.',
            link: '/reports',
            color: '#8b5cf6',
        },
        {
            icon: '💊',
            title: 'Preventive Care Advisor',
            description: 'Receive personalized lifestyle and preventive care recommendations based on your health profile.',
            link: '/advice',
            color: '#10b981',
        },
    ];

    const stats = [
        { value: '500+', label: 'Conditions Analyzed' },
        { value: '24/7', label: 'AI Availability' },
        { value: '100%', label: 'Privacy Focused' },
        { value: '10+', label: 'Languages Supported' },
    ];

    return (
        <div className="home page-enter">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        AI-Powered Health Intelligence
                    </div>
                    <h1 className="hero-title">
                        Your Personal <span className="gradient-text">AI Health</span> Guardian
                    </h1>
                    <p className="hero-subtitle">
                        Early detection saves lives. Our AI analyzes your symptoms, understands your medical reports,
                        and provides personalized preventive care — all in simple language you can understand.
                    </p>
                    <div className="hero-actions">
                        <Link to="/symptoms" className="btn-primary">
                            🩺 Check Symptoms Now
                        </Link>
                        <Link to="/reports" className="btn-secondary">
                            📋 Analyze a Report
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-value gradient-text">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="hero-visual">
                    <div className="float-card fc1">❤️ Heart Health</div>
                    <div className="float-card fc2">🧬 Diabetes Check</div>
                    <div className="float-card fc3">🫁 Lung Function</div>
                    <div className="float-card fc4">🧠 Mental Wellness</div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">
                        <span className="gradient-text">Core Features</span>
                    </h2>
                    <p className="section-subtitle">
                        Powered by advanced AI to help you take control of your health journey.
                    </p>

                    <div className="features-grid">
                        {features.map((feature, i) => (
                            <Link to={feature.link} key={i} className="feature-card glass-card" style={{ '--card-color': feature.color }}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.description}</p>
                                <span className="feature-cta">
                                    Get Started →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-section">
                <div className="container">
                    <h2 className="section-title">
                        <span className="gradient-text">How It Works</span>
                    </h2>
                    <p className="section-subtitle">
                        Three simple steps to better health awareness.
                    </p>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Input Your Data</h3>
                            <p>Enter your symptoms, upload medical reports, or describe your health concerns.</p>
                        </div>
                        <div className="step-connector">→</div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>AI Analysis</h3>
                            <p>Our AI processes your data using advanced medical knowledge to identify potential risks.</p>
                        </div>
                        <div className="step-connector">→</div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Get Insights</h3>
                            <p>Receive clear, actionable health insights and preventive care recommendations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card glass-card">
                        <h2>Ready to Take Control of Your Health?</h2>
                        <p>Start by checking your symptoms or uploading a medical report. It takes less than a minute.</p>
                        <Link to="/symptoms" className="btn-primary">
                            🚀 Get Started Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
