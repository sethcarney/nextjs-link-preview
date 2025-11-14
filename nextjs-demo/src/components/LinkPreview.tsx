"use client";

/**
 * Simple Link Preview Component
 *
 * Usage with custom image:
 *   <LinkPreview
 *     url="https://example.com"
 *     title="Example"
 *     description="Example description"
 *     image="https://example.com/image.png"
 *   />
 *
 * Usage with preset:
 *   <LinkPreview
 *     url="https://github.com/user/repo"
 *     title="My Repo"
 *     description="A cool repository"
 *     preset="github"
 *   />
 */

import React from "react";

export type LinkPreviewSize = "small" | "medium" | "large";
export type LinkPreviewLayout = "vertical" | "horizontal";
export type LinkPreviewPreset = "github" | "npm";

// Inline SVG data URIs for preset images
const PRESET_IMAGES: Record<LinkPreviewPreset, string> = {
  github: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC44NTQgMEMyMS44MzkgMCAwIDIyIDAgNDkuMjE3YzAgMjEuNzU2IDEzLjk5MyA0MC4xNzIgMzMuNDA1IDQ2LjY5IDIuNDI3LjQ5IDMuMzE2LTEuMDU5IDMuMzE2LTIuMzYyIDAtMS4xNDEtLjA4LTUuMDUyLS4wOC05LjEyNy0xMy41OSAyLjkzNC0xNi40Mi01Ljg2Ny0xNi40Mi01Ljg2Ny0yLjE4NC01LjcwNC01LjQyLTcuMTctNS40Mi03LjE3LTQuNDQ4LTMuMDE1LjMyNC0zLjAxNS4zMjQtMy4wMTUgNC45MzQuMzI2IDcuNTIzIDUuMDUyIDcuNTIzIDUuMDUyIDQuMzY3IDcuNDk2IDExLjQwNCA1LjM3OCAxNC4yMzUgNC4wNzQuNDA0LTMuMTc4IDEuNjk5LTUuMzc4IDMuMDc0LTYuNi0xMC44MzktMS4xNDEtMjIuMjQzLTUuMzc4LTIyLjI0My0yNC4yODMgMC01LjM3OCAxLjk0LTkuNzc4IDUuMDE0LTEzLjItLjQ4NS0xLjIyMi0yLjE4NC02LjI3NS40ODYtMTMuMDM4IDAgMCA0LjEyNS0xLjMwNCAxMy40MjYgNS4wNTJhNDYuOTcgNDYuOTcgMCAwIDEgMTIuMjE0LTEuNjNjNC4xMjUgMCA4LjMzLjU3MSAxMi4yMTMgMS42MyA5LjMwMi02LjM1NiAxMy40MjctNS4wNTIgMTMuNDI3LTUuMDUyIDIuNjcgNi43NjMuOTcgMTEuODE2LjQ4NSAxMy4wMzggMy4xNTUgMy40MjIgNS4wMTUgNy44MjIgNS4wMTUgMTMuMiAwIDE4LjkwNS0xMS40MDQgMjMuMDYtMjIuMzI0IDI0LjI4MyAxLjc4IDEuNTQ4IDMuMzE2IDQuNDgxIDMuMzE2IDkuMTI2IDAgNi42LS4wOCAxMS44OTctLjA4IDEzLjUyNiAwIDEuMzA0Ljg5IDIuODUzIDMuMzE2IDIuMzY0IDE5LjQxMi02LjUyIDMzLjQwNS0yNC45MzUgMzMuNDA1LTQ2LjY5MUM5Ny43MDcgMjIgNzUuNzg4IDAgNDguODU0IDB6IiBmaWxsPSIjMjQyOTJmIi8+PC9zdmc+`,
  npm: "https://avatars.githubusercontent.com/u/6078720?s=200&v=4"
};

export interface LinkPreviewProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  preset?: LinkPreviewPreset;
  size?: LinkPreviewSize;
  layout?: LinkPreviewLayout;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const sizeConfig = {
  small: {
    imageHeight: "120px",
    imageWidth: "120px",
    titleSize: "14px",
    descriptionSize: "12px",
    padding: "8px",
    lineClamp: 1
  },
  medium: {
    imageHeight: "200px",
    imageWidth: "200px",
    titleSize: "16px",
    descriptionSize: "14px",
    padding: "12px",
    lineClamp: 2
  },
  large: {
    imageHeight: "300px",
    imageWidth: "280px",
    titleSize: "20px",
    descriptionSize: "16px",
    padding: "16px",
    lineClamp: 3
  }
};

export function LinkPreview({
  url,
  title,
  description,
  image,
  preset,
  size = "medium",
  layout = "vertical",
  width = "100%",
  height = "auto",
  className = ""
}: LinkPreviewProps) {
  const config = sizeConfig[size];
  const isHorizontal = layout === "horizontal";

  // Use preset image if no custom image provided
  const imageUrl = image || (preset ? PRESET_IMAGES[preset] : undefined);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-preview ${className}`}
      style={{
        display: isHorizontal ? "flex" : "block",
        flexDirection: isHorizontal ? "row" : undefined,
        width,
        height,
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "box-shadow 0.3s"
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {imageUrl && (
        <div
          style={{
            width: isHorizontal ? config.imageWidth : "100%",
            height: isHorizontal ? "100%" : config.imageHeight,
            minHeight: isHorizontal ? config.imageHeight : undefined,
            flexShrink: isHorizontal ? 0 : undefined,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      )}
      <div
        style={{
          padding: config.padding,
          flex: isHorizontal ? 1 : undefined,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: config.titleSize }}>{title}</h3>
        {description && (
          <p
            style={
              {
                margin: 0,
                fontSize: config.descriptionSize,
                color: "#666",
                display: "-webkit-box",
                WebkitLineClamp: config.lineClamp,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              } as React.CSSProperties
            }
          >
            {description}
          </p>
        )}
      </div>
    </a>
  );
}

export default LinkPreview;
