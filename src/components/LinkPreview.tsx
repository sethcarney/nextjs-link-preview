import React, { useEffect, useState } from "react";
import { LinkPreviewData, LinkPreviewProps } from "../types";
import { fetchMetadata } from "../utils/metadata";

const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  width = "100%",
  height = "auto",
  className = "",
  onError,
  onLoad
}) => {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        setLoading(true);
        const metadata = await fetchMetadata(url);
        setData(metadata);
        onLoad?.(metadata);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, [url, onError, onLoad]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading preview</div>;
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
        display: "block",
        width,
        height,
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden"
      }}
    >
      {data.image && (
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      )}
      <div style={{ padding: "12px" }}>
        {data.title && <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>{data.title}</h3>}
        {data.description && (
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#666",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {data.description}
          </p>
        )}
      </div>
    </a>
  );
};

export default LinkPreview;
