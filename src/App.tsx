import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all page components
const HomePage = lazy(() => import('./components/HomePage'));
const ToursPage = lazy(() => import('./components/ToursPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogArticle = lazy(() => import('./components/BlogArticle'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const CarRentalPage = lazy(() => import('./components/CarRentalPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

// Development tools - only load in development
const TestSEO = lazy(() => import('./components/TestSEO'));
const PerformanceMonitor = lazy(() => import('./components/PerformanceMonitor'));
const SEOAnalyzer = lazy(() => import('./components/SEOAnalyzer'));
const SupabaseTest = lazy(() => import('./components/SupabaseTest'));
const EnvDebug = lazy(() => import('./components/EnvDebug'));
const SupabaseDiagnostic = lazy(() => import('./components/SupabaseDiagnostic'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const BlogManager = lazy(() => import('./components/BlogManager'));
const BlogPageSupabase = lazy(() => import('./components/BlogPageSupabase'));
const BlogSelector = lazy(() => import('./components/BlogSelector'));

// Performance optimizer - load after initial render
const PerformanceOptimizer = lazy(() => import('./components/PerformanceOptimizer'));

function App() {
  return (
    <>
      {/* Performance optimizer - loaded after initial render to avoid blocking */}
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <PerformanceOptimizer />
        </Suspense>
      )}
      
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rental" element={<CarRentalPage />} />
          
          {/* Development routes */}
          {import.meta.env.DEV && (
            <>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/blog-manager" element={<BlogManager />} />
              <Route path="/blog-supabase" element={<BlogPageSupabase />} />
              <Route path="/blog-selector" element={<BlogSelector />} />
              <Route path="/env-debug" element={<EnvDebug />} />
              <Route path="/supabase-diagnostic" element={<SupabaseDiagnostic />} />
              <Route path="/supabase-test" element={<SupabaseTest />} />
              <Route path="/test-seo" element={<TestSEO />} />
              <Route path="/performance-monitor" element={<PerformanceMonitor />} />
              <Route path="/seo-analyzer" element={<SEOAnalyzer />} />
            </>
          )}
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;