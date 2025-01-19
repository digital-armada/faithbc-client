// domain/entities/Doctrine.ts
export interface Doctrine {
  id: number;
  title: string;
  content: string; // or use rich text type if needed
  slug: string;
}

export default Doctrine;
