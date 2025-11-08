'use client';

/**
 * Next.js Link Preview Component
 *
 * This component uses the Next.js API route to fetch metadata server-side,
 * avoiding CORS issues entirely.
 *
 * Usage:
 *   import { LinkPreview } from './components/LinkPreview';
 *
 *   <LinkPreview url="https://github.com" size="medium" />
 */

import React, { useEffect, useState } from 'react';

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export type LinkPreviewSize = 'small' | 'medium' | 'large';

export interface LinkPreviewProps {
  url: string;
  size?: LinkPreviewSize;
  width?: string | number;
  height?: string | number;
  className?: string;
  onError?: (error: Error) => void;
  onLoad?: (data: LinkPreviewData) => void;
  apiEndpoint?: string; // Override the API endpoint if needed
}

const sizeConfig = {
  small: {
    imageHeight: '120px',
    titleSize: '14px',
    descriptionSize: '12px',
    padding: '8px',
    lineClamp: 1
  },
  medium: {
    imageHeight: '200px',
    titleSize: '16px',
    descriptionSize: '14px',
    padding: '12px',
    lineClamp: 2
  },
  large: {
    imageHeight: '300px',
    titleSize: '20px',
    descriptionSize: '16px',
    padding: '16px',
    lineClamp: 3
  }
};

export function LinkPreview({
  url,
  size = 'medium',
  width = '100%',
  height = 'auto',
  className = '',
  onError,
  onLoad,
  apiEndpoint = '/api/preview'
}: LinkPreviewProps) {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const config = sizeConfig[size];

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch metadata');
        }

        const metadata = await response.json();
        setData(metadata);
        onLoad?.(metadata);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url, apiEndpoint]); // Don't include callbacks in dependencies to avoid infinite loops

  if (loading) {
    return (
      <div
        style={{
          padding: '1rem',
          textAlign: 'center',
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          background: '#f9f9f9'
        }}
      >
        Loading preview...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '1rem',
          background: '#fff3f3',
          border: '1px solid #f44336',
          borderRadius: '8px'
        }}
      >
        <strong style={{ color: '#d32f2f' }}>Error loading preview:</strong>{' '}
        {error.message}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-preview ${className}`}
      style={{
        display: 'block',
        width,
        height,
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {data.image && (
        <div
          style={{
            width: '100%',
            height: config.imageHeight,
            backgroundImage: `url(${data.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      <div style={{ padding: config.padding }}>
        {data.title && (
          <h3 style={{ margin: '0 0 8px 0', fontSize: config.titleSize }}>
            {data.title}
          </h3>
        )}
        {data.description && (
          <p
            style={{
              margin: 0,
              fontSize: config.descriptionSize,
              color: '#666',
              display: '-webkit-box',
              WebkitLineClamp: config.lineClamp,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            } as React.CSSProperties}
          >
            {data.description}
          </p>
        )}
      </div>
    </a>
  );
}

export default LinkPreview;
