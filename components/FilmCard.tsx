import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import { Link } from "expo-router";

type FilmProps = {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
};

const FilmCard = ({ id, poster_path, title, name }: FilmProps) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600*400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <ThemedText className="line-clamp-1 font-Poppins text-sm">
          {title || name}
        </ThemedText>
      </TouchableOpacity>
    </Link>
  );
};

export default FilmCard;
