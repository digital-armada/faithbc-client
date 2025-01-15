export interface Sermon {
  id: string;
  attributes: {
    name: string;
    date: string;
    audio?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    slug: string;
    youtube?: string;
    verse?: string;
    speaker?: {
      data: {
        attributes: Speaker;
      };
    };
    series?: {
      data: {
        attributes: Series;
      };
    };
    service_type?:
      | "Sunday Morning"
      | "Sunday Evening"
      | "Wednesday Evening"
      | "Friday Youth"
      | "Sunday School"
      | "Special Events";
    youtubeId?: string;
    description?: string;
    imageUrl?: string;
  };
}
export interface SermonRes {
  success: boolean;
  data: Sermon[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Speaker {
  speaker: string;
  id: number;
  attributes: {
    speaker: string;
    sermons?: {
      data: Sermon[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Series {
  id: number;
  attributes: {
    name: string;
    sermons?: {
      data: Sermon[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type SermonResponse = ApiResponse<Sermon>;
