// types/media.ts
export interface MediaMetadata {
  name?: string;
  contentType?: string;
  ref?: string;
  refId?: string | number;
  field?: string;
}

export interface UploadResponse {
  id: number;
  url: string;
  name: string;
  size: number;
  mime: string;
  [key: string]: any;
}

export interface MediaUploadResult {
  data: {
    id: number;
    url: string;
  } | null;
  error: string | null;
  message: string;
}
