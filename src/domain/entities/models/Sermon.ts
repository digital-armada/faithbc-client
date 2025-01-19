// domain/entities/Sermon.ts
export interface Sermon {
  id: number;
  name: string;
  date: Date;
  audio: string | null;
  slug: string;
  youtube: string;
  verse: string;
  speaker: number; // Initially, just store the ID
  series: number; // Initially, just store the ID
  service_type: string;
  youtubeId: string;
  description: string;
  imageUrl: string | null;
}

export default Sermon;
