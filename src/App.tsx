import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { PredictPage } from './pages/PredictPage';
import { ResultsPage } from './pages/ResultsPage';
import { AssistantPage } from './pages/AssistantPage';
import { BatchPage } from './pages/BatchPage';
import { HistoryPage } from './pages/HistoryPage';
import { XAIPage } from './pages/XAIPage';
import { AttentionPage } from './pages/AttentionPage';
import { PathwaysPage } from './pages/PathwaysPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { DatasetPage } from './pages/DatasetPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { APIPage } from './pages/APIPage';
import { DocsPage } from './pages/DocsPage';
import { UseCasesPage } from './pages/UseCasesPage';
import { ResearchPage } from './pages/ResearchPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SavedAnalysesPage } from './pages/SavedAnalysesPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SecurityPage } from './pages/SecurityPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { Sidebar, Header } from './components/layout/AppLayout';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/auth" />;
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#050505]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Main */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/predict" element={<ProtectedRoute><PredictPage /></ProtectedRoute>} />
        <Route path="/batch" element={<ProtectedRoute><BatchPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        
        {/* Analysis */}
        <Route path="/xai" element={<ProtectedRoute><XAIPage /></ProtectedRoute>} />
        <Route path="/attention" element={<ProtectedRoute><AttentionPage /></ProtectedRoute>} />
        <Route path="/pathways" element={<ProtectedRoute><PathwaysPage /></ProtectedRoute>} />
        <Route path="/comparison" element={<ProtectedRoute><ComparisonPage /></ProtectedRoute>} />
        
        {/* Platform */}
        <Route path="/dataset" element={<ProtectedRoute><DatasetPage /></ProtectedRoute>} />
        <Route path="/architecture" element={<ProtectedRoute><ArchitecturePage /></ProtectedRoute>} />
        <Route path="/benchmarks" element={<ProtectedRoute><BenchmarksPage /></ProtectedRoute>} />
        <Route path="/api-access" element={<ProtectedRoute><APIPage /></ProtectedRoute>} />
        
        {/* Resources */}
        <Route path="/docs" element={<ProtectedRoute><DocsPage /></ProtectedRoute>} />
        <Route path="/use-cases" element={<ProtectedRoute><UseCasesPage /></ProtectedRoute>} />
        <Route path="/research" element={<ProtectedRoute><ResearchPage /></ProtectedRoute>} />
        <Route path="/case-studies" element={<ProtectedRoute><CaseStudiesPage /></ProtectedRoute>} />
        
        {/* Account */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><SavedAnalysesPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        
        {/* Info */}
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
        <Route path="/how-it-works" element={<ProtectedRoute><HowItWorksPage /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
        <Route path="/changelog" element={<ProtectedRoute><ChangelogPage /></ProtectedRoute>} />
        
        {/* Results */}
        <Route path="/results/:id" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
        <Route path="/assistant" element={<ProtectedRoute><AssistantPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
