export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_AUTH_KEY}`,
  },
};

export const fetchFilms = async ({
  query,
  mediaType,
}: {
  query?: string;
  mediaType?: "movie" | "tv" | "kids";
}) => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/multi?query=${encodeURIComponent(
          query
        )}&language=en-US&page=1`
      : mediaType === "movie"
      ? `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&watch_region=US&vote_average.gte=4&with_origin_country=US&with_original_language=en&without_genres=16%2C10763%2C10767&page=1`
      : mediaType === "tv"
      ? `${TMDB_CONFIG.BASE_URL}/discover/tv?include_adult=false&include_video=false&language=en-US&watch_region=US&first_air_date.gte=2020-01-01&sort_by=popularity.desc&with_original_language=en&without_genres=16%2C10763%2C10767&page=1`
      : `${TMDB_CONFIG.BASE_URL}//discover/movie?include_adult=false&include_video=false&language=en-US&region=US&sort_by=popularity.desc&with_genres=16%2C10751&with_original_language=en&without_genres=10749%2C27%2C36%2C80%2C99%2C36%2C53%2C37&page=1`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch films: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    throw new Error(`An error occurred on the backend: ${error}`);
  }
};

export const getCarouselFilms = async () => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_EXPRESS_URL!, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`error: ${error}`);
    return [];
  }
};
