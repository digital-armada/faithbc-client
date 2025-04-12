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
  eventStartDate?: string;
  eventEndDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
}

export interface EventFormData {
  title: string;
  slug: string;
  content?: string;
  startDate?: string;
  endDate?: string;
  organiser?: string;
  venName?: string;
  venAdd?: string;
  internal: boolean;
  featuredImage?: number;
  eventStartDate?: string;
  eventEndDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
}
