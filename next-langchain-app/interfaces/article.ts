export interface IArticle {
  id: number;
  title: string;
  content: string | null;
  view_cnt: number;
  ip_address?: string;
  created_at: string;
  created_member_id: number;
}
