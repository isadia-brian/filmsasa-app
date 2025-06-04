import { DatabaseData, FilmDetails } from "@/types";
import { convertMinutes } from "@/utils";

const SERVER_URL = process.env.EXPO_PUBLIC_EXPRESS_URL;

export const getCarouselFilms = async () => {
  try {
    const response = await fetch(`${SERVER_URL}`, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`error: ${error}`);
    return [];
  }
};

export const getTrendingFilms = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/trending`, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();

    const films = formatFeaturedData(data);

    return films;
  } catch (error) {
    console.log(`error: ${error}`);
    return [];
  }
};

export const getPopularFilms = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/popular`, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    const films = formatFeaturedData(data);
    return films;
  } catch (error) {
    console.log(`error: ${error}`);
    return [];
  }
};

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
          query,
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
    throw new Error(
      `${
        error instanceof Error
          ? error.message
          : "An error occurred on the server"
      }`,
    );
  }
};

export const fetchFilmDetails = async ({
  mediaType,
  tmdbId,
}: {
  mediaType: "movie" | "tv";
  tmdbId: number;
}): Promise<FilmDetails | undefined> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/${mediaType}/${tmdbId}?append_to_response=recommendations,credits,videos&api_key=${TMDB_CONFIG.API_KEY}`,
    );
    const film = await response.json();

    const title = film.title || film.name;
    const overview = film.overview;
    const backdropImage = film.backdrop_path;
    const posterImage = film.poster_path;

    const similar = film.recommendations.results;

    const recommendations = similar.slice(0, 5);
    const vote_average = film.vote_average;

    let seasons: number = 0;
    let year: number | null = null;
    let runtime: string = "";

    let seriesData: FilmDetails["seriesData"] | null = {
      seasons: null,
      episodes: null,
    };

    let trailerUrl: string | null = "";
    let videoId: string | null = "";

    const genres = film.genres.map((g: { name: string }) => g.name);
    const credits = film.credits.cast;
    const actors = credits
      .filter(
        (star: { known_for_department: string }) =>
          star.known_for_department === "Acting",
      )
      .map(
        (actor: { profile_path: string; name: string; character: string }) => {
          return {
            name: actor.name,
            profile_path: actor.profile_path,
            character: actor.character,
          };
        },
      );

    const cast = actors.slice(0, 10);

    if (mediaType === "tv") {
      seasons = parseInt(film.number_of_seasons);
      year = parseInt(film.first_air_date.split("-")[0]);
      const data = await fetchSeriesData(mediaType, seasons, tmdbId);
      if (data !== null) {
        seriesData = data;
      } else {
        seriesData = null;
      }
    } else {
      seriesData = null;
      year = parseInt(film.release_date.split("-")[0]);
      runtime = convertMinutes(film.runtime);
    }

    const trailer = film.videos.results.find(
      (video: { name: string; site: string }) =>
        video.name.toLowerCase().includes("trailer") &&
        video.site === "YouTube",
    );

    if (!trailer) {
      trailerUrl = null;
      videoId = null;
    } else {
      trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      videoId = trailer.key;
    }

    const video = {
      trailerUrl,
      videoId,
    };

    return {
      tmdbId,
      title,
      overview,
      year,
      recommendations,
      mediaType,
      genres,
      video,
      backdropImage,
      posterImage,
      runtime,
      vote_average,
      seriesData,
      cast,
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      `${
        error instanceof Error
          ? error.message
          : "An error occurred on the server"
      }`,
    );
  }
};

const fetchSeriesData = async (
  media_type: "tv",
  seasons: number,
  tmdbId: number,
) => {
  let tvData: FilmDetails["seriesData"] | null = {
    seasons: null,
    episodes: null,
  };
  const urls = Array.from(
    { length: seasons },
    (_, i) =>
      `${TMDB_CONFIG.BASE_URL}/${media_type}/${tmdbId}/season/${
        i + 1
      }?language=en-US&api_key=${TMDB_CONFIG.API_KEY}`,
  );

  try {
    for (let i = 0; i < urls.length; i++) {
      try {
        const response = await fetch(urls[i]);
        if (!response.ok) {
          console.log(
            `Error fetching response: HTTP ${response.status} - ${response.statusText}`,
          );
        }
        const { episodes } = await response.json();

        if (episodes) {
          const data = episodes.map(
            ({
              episode_number,
              id,
              name,
              still_path,
              season_number,
            }: {
              episode_number: number;
              id: number;
              name: string;
              still_path: string;
              season_number: number;
            }) => ({ episode_number, id, name, still_path, season_number }),
          );
          tvData.episodes?.push(...data);
        }
      } catch (error) {
        console.log(`An error occurred: ${error}`);
      }
    }
    tvData.seasons = seasons;
    return tvData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const formatFeaturedData = (films: DatabaseData[]) => {
  const sanitizedData = films.map((film) => {
    return {
      title: film.title,
      mediaType: film.media_type,
      posterImage: film.poster_image,
      tmdbId: film.tmdb_id,
    };
  });

  return sanitizedData;
};
