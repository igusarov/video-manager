export interface AuthorVideo {
  id: number;
  catIds: number[]
  name: string;
}

export interface Author {
  id: number;
  name: string;
  videos: AuthorVideo[];
}
