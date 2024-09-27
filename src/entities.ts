export type User = {
    id: number;
    name:string;
    isAdmin?: boolean;
}

export interface Movie {
    title: string;
    year: number;
    rating: string;
    actors: string[];
    genre: string;
    synopsis: string;
    thumbnail: string;
    trending: boolean;
    recommended: boolean;
  }
  