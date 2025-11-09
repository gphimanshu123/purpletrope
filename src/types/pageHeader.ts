export type PageKey = "work" | "blog";

export interface PageHeaderContent {
  page: PageKey;
  label?: string | null;
  title: string;
  description: string;
}
