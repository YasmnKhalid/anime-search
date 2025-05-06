export interface AnimeSummary {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
    synopsis: string;
  }
  
  export interface AnimeSearchResponse {
    data: AnimeSummary[];
    pagination: {
      current_page: number;
      last_visible_page: number;
      has_next_page: boolean;
    };
  }
  