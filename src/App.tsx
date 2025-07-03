import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogArticle from './components/BlogArticle';
import AboutPage from './components/AboutPage';
import CarRentalPage from './components/CarRentalPage';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rental" element={<CarRentalPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;