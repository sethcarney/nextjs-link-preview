export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export type LinkPreviewSize = "small" | "medium" | "large";

export interface LinkPreviewProps {
  url: string;
  size?: LinkPreviewSize;
  width?: string | number;
  height?: string | number;
  className?: string;
  onError?: (error: Error) => void;
  onLoad?: (data: LinkPreviewData) => void;
}
