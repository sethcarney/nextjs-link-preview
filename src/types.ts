export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface LinkPreviewProps {
  url: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onError?: (error: Error) => void;
  onLoad?: (data: LinkPreviewData) => void;
}
