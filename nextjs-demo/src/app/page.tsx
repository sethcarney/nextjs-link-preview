'use client';

import { useState } from 'react';
import { LinkPreview, LinkPreviewSize, LinkPreviewData } from '../components/LinkPreview';
import './page.css';

const exampleUrls = [
  'https://github.com',
  'https://www.wikipedia.org',
  'https://stackoverflow.com',
  'https://www.youtube.com',
  'https://twitter.com',
  'https://www.reddit.com',
  'https://medium.com',
  'https://dev.to'
];

export default function Home() {
  const [customUrl, setCustomUrl] = useState('');
  const [testUrl, setTestUrl] = useState('https://github.com');
  const [selectedSize, setSelectedSize] = useState<LinkPreviewSize>('medium');
  const [loadedData, setLoadedData] = useState<LinkPreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = () => {
    if (customUrl.trim()) {
      setTestUrl(customUrl.trim());
      setLoadedData(null);
      setError(null);
    }
  };

  const handleExampleClick = (url: string) => {
    setCustomUrl(url);
    setTestUrl(url);
    setLoadedData(null);
    setError(null);
  };

  const handleLoad = (data: LinkPreviewData) => {
    setLoadedData(data);
    setError(null);
  };

  const handleError = (err: Error) => {
    setError(err.message);
    setLoadedData(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Next.js Link Preview - Test Suite</h1>
        <p>Test the link preview component with server-side rendering - No CORS issues!</p>
      </header>

      <div className="container">
        {/* URL Input Section */}
        <div className="input-section">
          <h2>Enter URL to Preview</h2>
          <div className="url-input-group">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter a URL (e.g., https://github.com)"
              className="url-input"
              onKeyPress={(e) => e.key === 'Enter' && handleTest()}
            />
            <button onClick={handleTest} className="test-button">
              Test Preview
            </button>
          </div>

          <div className="example-urls">
            <h3>Example URLs:</h3>
            <div className="url-chips">
              {exampleUrls.map((url) => (
                <button
                  key={url}
                  onClick={() => handleExampleClick(url)}
                  className={`url-chip ${testUrl === url ? 'active' : ''}`}
                >
                  {new URL(url).hostname.replace('www.', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Size Selector */}
        <div className="size-section">
          <h2>Select Size Variant</h2>
          <div className="size-buttons">
            <button
              onClick={() => setSelectedSize('small')}
              className={`size-button ${selectedSize === 'small' ? 'active' : ''}`}
            >
              Small
            </button>
            <button
              onClick={() => setSelectedSize('medium')}
              className={`size-button ${selectedSize === 'medium' ? 'active' : ''}`}
            >
              Medium
            </button>
            <button
              onClick={() => setSelectedSize('large')}
              className={`size-button ${selectedSize === 'large' ? 'active' : ''}`}
            >
              Large
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <h2>Preview</h2>
          <div className="preview-info">
            <p><strong>URL:</strong> {testUrl}</p>
            <p><strong>Size:</strong> {selectedSize}</p>
            <p className="success-note">✓ Server-side fetching - No CORS issues!</p>
          </div>

          <div className="preview-container">
            <LinkPreview
              url={testUrl}
              size={selectedSize}
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>

          {/* Metadata Display */}
          {loadedData && (
            <div className="metadata-section">
              <h3>Extracted Metadata</h3>
              <div className="metadata">
                <div className="metadata-item">
                  <strong>Title:</strong> {loadedData.title || '(none)'}
                </div>
                <div className="metadata-item">
                  <strong>Description:</strong> {loadedData.description || '(none)'}
                </div>
                <div className="metadata-item">
                  <strong>Image URL:</strong> {loadedData.image || '(none)'}
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="error-section">
              <h3>Error</h3>
              <p className="error-message">{error}</p>
            </div>
          )}
        </div>

        {/* All Sizes Preview */}
        <div className="all-sizes-section">
          <h2>All Size Variants (Vertical)</h2>
          <p>Compare all three size variants side by side:</p>
          <div className="sizes-grid">
            <div className="size-preview">
              <h3>Small</h3>
              <LinkPreview url={testUrl} size="small" />
            </div>
            <div className="size-preview">
              <h3>Medium</h3>
              <LinkPreview url={testUrl} size="medium" />
            </div>
            <div className="size-preview">
              <h3>Large</h3>
              <LinkPreview url={testUrl} size="large" />
            </div>
          </div>
        </div>

        {/* Horizontal Layout Preview */}
        <div className="all-sizes-section">
          <h2>Horizontal Layout</h2>
          <p>Image on the left, text on the right:</p>
          <div className="horizontal-grid">
            <div className="size-preview">
              <h3>Small - Horizontal</h3>
              <LinkPreview url={testUrl} size="small" layout="horizontal" />
            </div>
            <div className="size-preview">
              <h3>Medium - Horizontal</h3>
              <LinkPreview url={testUrl} size="medium" layout="horizontal" />
            </div>
            <div className="size-preview">
              <h3>Large - Horizontal</h3>
              <LinkPreview url={testUrl} size="large" layout="horizontal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
