import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertCircle, XCircle, BarChart3 } from 'lucide-react';
import { calculateSEOScore } from '../utils/seo';

function SEOAnalyzer() {
  const [seoData, setSeoData] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const analyzePage = () => {
      const title = document.title;
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => h.textContent || '');
      
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => ({ alt: img.alt }));
      
      const links = Array.from(document.querySelectorAll('a'))
        .map(link => ({ text: link.textContent || '' }));
      
      const content = document.body.textContent || '';

      const analysis = calculateSEOScore({
        title,
        description,
        keywords,
        headings,
        images,
        links,
        content
      });

      setSeoData({
        title,
        description,
        keywords,
        headings: headings.length,
        images: images.length,
        imagesWithAlt: images.filter(img => img.alt).length,
        links: links.length,
        contentLength: content.length,
        analysis
      });
    };

    // Analyze page after content loads
    setTimeout(analyzePage, 1000);

    // Keyboard shortcut to toggle
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        setIsVisible(prev => !prev);
        if (!isVisible) analyzePage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle size={16} className="text-green-600" />;
    if (score >= 60) return <AlertCircle size={16} className="text-yellow-600" />;
    return <XCircle size={16} className="text-red-600" />;
  };

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 max-w-md max-h-96 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Search size={16} />
            SEO Analyzer
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* SEO Score */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">SEO Score</span>
            <div className="flex items-center gap-2">
              {getScoreIcon(seoData.analysis?.score || 0)}
              <span className={`text-lg font-bold ${getScoreColor(seoData.analysis?.score || 0)}`}>
                {seoData.analysis?.score || 0}/100
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                (seoData.analysis?.score || 0) >= 80 ? 'bg-green-500' :
                (seoData.analysis?.score || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${seoData.analysis?.score || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Page Info */}
        <div className="space-y-3 text-xs">
          <div>
            <h4 className="font-semibold mb-1">Title</h4>
            <div className="text-gray-600 break-words">
              {seoData.title || 'No title found'}
              <span className="ml-2 text-gray-400">
                ({seoData.title?.length || 0} chars)
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-1">Description</h4>
            <div className="text-gray-600 break-words">
              {seoData.description || 'No description found'}
              <span className="ml-2 text-gray-400">
                ({seoData.description?.length || 0} chars)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="font-semibold mb-1">Content</h4>
              <div className="text-gray-600">
                {seoData.contentLength} characters
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Headings</h4>
              <div className="text-gray-600">
                {seoData.headings} found
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Images</h4>
              <div className="text-gray-600">
                {seoData.imagesWithAlt}/{seoData.images} with alt
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Links</h4>
              <div className="text-gray-600">
                {seoData.links} found
              </div>
            </div>
          </div>

          {/* Issues */}
          {seoData.analysis?.issues?.length > 0 && (
            <div>
              <h4 className="font-semibold mb-1 text-red-600">Issues</h4>
              <ul className="space-y-1">
                {seoData.analysis.issues.map((issue: string, index: number) => (
                  <li key={index} className="text-red-600 text-xs flex items-start gap-1">
                    <XCircle size={12} className="mt-0.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-400">
          Press Ctrl+Shift+S to toggle
        </div>
      </div>
    </div>
  );
}

export default SEOAnalyzer;