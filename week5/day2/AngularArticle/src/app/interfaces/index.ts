export interface IArticle {
  id?: number;
  author: string;
  title: string;
  content: string;
  comments: IComment[];
}

export interface IComment {
  author: string;
  body: string;
}