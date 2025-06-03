export interface FilmDetails {
  tmdbId: number;
  title: string;
  overview: string;
  genres: string[];
  posterImage: string;
  backdropImage: string;
  year: number;
  mediaType: "movie" | "tv";
  vote_average: number;
  runtime?: string;
  recommendations:
    | {
        id: number;
        title: string;
        backdrop_path: string;
        media_type: string;
      }[]
    | null;
  cast?:
    | {
        name: string;
        profile_path: string;
        character: string;
      }[]
    | null;
  video: {
    trailerUrl: string | null;
    videoId: string | null;
  } | null;
  seriesData: {
    seasons: number | null;
    episodes:
      | {
          episode_number: number;
          id: number;
          name: string;
          still_path: string;
          season_number: number;
        }[]
      | null;
  } | null;
}
