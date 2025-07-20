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
import NotFoundPage from './components/NotFoundPage';
import { useScrollToHash } from './hooks/useScrollToHash';

function App() {
  useScrollToHash(80);
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rental" element={<CarRentalPage />} />
          <Route path="/test-seo" element={<TestSEO />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* Development tools */}
        <PerformanceMonitor />
        <SEOAnalyzer />
      </div>
    </ErrorBoundary>
  );
}

export default App;