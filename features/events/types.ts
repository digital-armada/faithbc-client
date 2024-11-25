export interface Event {
  id: number;
  attributes: EventAttributes;
}

export interface EventAttributes {
  slug: string;
  title: string;
  featuredImage?: {
    data?: {
      id: number;
      attributes?: {
        url: string;
        formats?: {
          thumbnail?: {
            url: string;
          };
        };
      };
    };
  };
  startDate: string;
  endDate?: string;
  content?: string;
  organiser?: string;
  venName?: string;
  venAdd?: string;
  internal: boolean;
}

export interface EventFormData {
  title: string;
  slug: string;
  content?: string;
  startDate: string;
  endDate?: string;
  organiser?: string;
  venName?: string;
  venAdd?: string;
  internal: boolean;
  featuredImage?: number;
}
