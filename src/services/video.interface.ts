export interface Video {
  id: number;
  name: string;
  author: string;
  categories: string[];
}

export type VideoDraft = Omit<Video, 'id'>;
