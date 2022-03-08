import { Profile } from './Profile';

// elements of article
export class Article {
  slug: string;
  title: string = '';
  description: string = '';
  body: string = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}