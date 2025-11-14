"use client";

import { useState } from "react";
import { LinkPreview, LinkPreviewSize, LinkPreviewPreset } from "../components/LinkPreview";
import "./page.css";

const presetExamples = [
  {
    url: "https://github.com/vercel/next.js",
    title: "Next.js",
    description: "The React Framework for the Web",
    preset: "github" as LinkPreviewPreset
  },
  {
    url: "https://github.com/facebook/react",
    title: "React",
    description: "A JavaScript library for building user interfaces",
    preset: "github" as LinkPreviewPreset
  },
  {
    url: "https://www.npmjs.com/package/react",
    title: "react",
    description: "React is a JavaScript library for building user interfaces.",
    preset: "npm" as LinkPreviewPreset
  },
  {
    url: "https://www.npmjs.com/package/next",
    title: "next",
    description: "The React Framework",
    preset: "npm" as LinkPreviewPreset
  }
];

const customImageExample = {
  url: "https://example.com/article",
  title: "How to Build Amazing Web Apps",
  description: "Learn the best practices for modern web development with React and Next.js",
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
};

export default function Home() {
  const [selectedSize, setSelectedSize] = useState<LinkPreviewSize>("medium");
  const [selectedLayout, setSelectedLayout] = useState<"vertical" | "horizontal">("vertical");

  return (
    <div className="app">
      <header className="header">
        <h1>Next.js Link Preview - Demo</h1>
        <p>A simple, lightweight component for displaying beautiful link preview cards</p>
      </header>

      <div className="container">
        {/* Size & Layout Controls */}
        <div className="controls-section">
          <div className="control-group">
            <h3>Size Variant</h3>
            <div className="size-buttons">
              <button
                onClick={() => setSelectedSize("small")}
                className={`size-button ${selectedSize === "small" ? "active" : ""}`}
              >
                Small
              </button>
              <button
                onClick={() => setSelectedSize("medium")}
                className={`size-button ${selectedSize === "medium" ? "active" : ""}`}
              >
                Medium
              </button>
              <button
                onClick={() => setSelectedSize("large")}
                className={`size-button ${selectedSize === "large" ? "active" : ""}`}
              >
                Large
              </button>
            </div>
          </div>

          <div className="control-group">
            <h3>Layout</h3>
            <div className="size-buttons">
              <button
                onClick={() => setSelectedLayout("vertical")}
                className={`size-button ${selectedLayout === "vertical" ? "active" : ""}`}
              >
                Vertical
              </button>
              <button
                onClick={() => setSelectedLayout("horizontal")}
                className={`size-button ${selectedLayout === "horizontal" ? "active" : ""}`}
              >
                Horizontal
              </button>
            </div>
          </div>
        </div>

        {/* GitHub Preset Examples */}
        <div className="section">
          <h2>GitHub Preset</h2>
          <p>Using the built-in GitHub logo preset</p>
          <div className="preview-grid">
            {presetExamples
              .filter((ex) => ex.preset === "github")
              .map((example, i) => (
                <div key={i} className="preview-item">
                  <LinkPreview
                    url={example.url}
                    title={example.title}
                    description={example.description}
                    preset={example.preset}
                    size={selectedSize}
                    layout={selectedLayout}
                  />
                  <details className="code-details">
                    <summary>View Code</summary>
                    <pre className="code-block">
                      {`<LinkPreview
  url="${example.url}"
  title="${example.title}"
  description="${example.description}"
  preset="github"
  size="${selectedSize}"
  layout="${selectedLayout}"
/>`}
                    </pre>
                  </details>
                </div>
              ))}
          </div>
        </div>

        {/* npm Preset Examples */}
        <div className="section">
          <h2>npm Preset</h2>
          <p>Using the built-in npm logo preset</p>
          <div className="preview-grid">
            {presetExamples
              .filter((ex) => ex.preset === "npm")
              .map((example, i) => (
                <div key={i} className="preview-item">
                  <LinkPreview
                    url={example.url}
                    title={example.title}
                    description={example.description}
                    preset={example.preset}
                    size={selectedSize}
                    layout={selectedLayout}
                  />
                  <details className="code-details">
                    <summary>View Code</summary>
                    <pre className="code-block">
                      {`<LinkPreview
  url="${example.url}"
  title="${example.title}"
  description="${example.description}"
  preset="npm"
  size="${selectedSize}"
  layout="${selectedLayout}"
/>`}
                    </pre>
                  </details>
                </div>
              ))}
          </div>
        </div>

        {/* Custom Image Example */}
        <div className="section">
          <h2>Custom Image</h2>
          <p>Using a custom image URL</p>
          <div className="preview-grid">
            <div className="preview-item">
              <LinkPreview
                url={customImageExample.url}
                title={customImageExample.title}
                description={customImageExample.description}
                image={customImageExample.image}
                size={selectedSize}
                layout={selectedLayout}
              />
              <details className="code-details">
                <summary>View Code</summary>
                <pre className="code-block">
                  {`<LinkPreview
  url="${customImageExample.url}"
  title="${customImageExample.title}"
  description="${customImageExample.description}"
  image="${customImageExample.image}"
  size="${selectedSize}"
  layout="${selectedLayout}"
/>`}
                </pre>
              </details>
            </div>
          </div>
        </div>

        {/* All Sizes Comparison */}
        <div className="section">
          <h2>Size Comparison</h2>
          <p>All three sizes side by side</p>
          <div className="sizes-comparison">
            <div className="size-item">
              <h3>Small</h3>
              <LinkPreview
                url={presetExamples[0].url}
                title={presetExamples[0].title}
                description={presetExamples[0].description}
                preset={presetExamples[0].preset}
                size="small"
                layout={selectedLayout}
              />
            </div>
            <div className="size-item">
              <h3>Medium</h3>
              <LinkPreview
                url={presetExamples[0].url}
                title={presetExamples[0].title}
                description={presetExamples[0].description}
                preset={presetExamples[0].preset}
                size="medium"
                layout={selectedLayout}
              />
            </div>
            <div className="size-item">
              <h3>Large</h3>
              <LinkPreview
                url={presetExamples[0].url}
                title={presetExamples[0].title}
                description={presetExamples[0].description}
                preset={presetExamples[0].preset}
                size="large"
                layout={selectedLayout}
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="section features">
          <h2>Features</h2>
          <ul>
            <li>✅ Pure presentational component - no data fetching</li>
            <li>✅ Preset image support for GitHub and npm</li>
            <li>✅ Three size variants (small, medium, large)</li>
            <li>✅ Two layouts (vertical, horizontal)</li>
            <li>✅ TypeScript support</li>
            <li>✅ Fully customizable styling</li>
            <li>✅ Zero dependencies (only peer deps: React, Next.js)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
