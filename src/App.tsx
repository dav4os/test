import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogArticle from './components/BlogArticle';
import AboutPage from './components/AboutPage';
import CarRentalPage from './components/CarRentalPage';
import TestSEO from './components/TestSEO';
import PerformanceMonitor from './components/PerformanceMonitor';
import SEOAnalyzer from './components/SEOAnalyzer';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rental" element={<CarRentalPage />} />
            <Route path="/test-seo" element={<TestSEO />} />
          </Routes>
          
          {/* Development tools */}
          <PerformanceMonitor />
          <SEOAnalyzer />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;