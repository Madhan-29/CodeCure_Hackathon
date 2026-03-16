import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SymptomAnalyzer from './pages/SymptomAnalyzer';
import ReportAnalyzer from './pages/ReportAnalyzer';
import HealthAdvice from './pages/HealthAdvice';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="bg-animation"></div>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptoms" element={<SymptomAnalyzer />} />
            <Route path="/reports" element={<ReportAnalyzer />} />
            <Route path="/advice" element={<HealthAdvice />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>
              🛡️ AI Health Guardian — Built for{' '}
              <span className="gradient-text">Codecure @ SPIRIT 2026</span>, IIT BHU Varanasi
            </p>
            <p className="footer-disclaimer">
              This tool is for informational purposes only. Always consult a qualified healthcare professional for medical advice.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
