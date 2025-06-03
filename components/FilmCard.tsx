import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import { Link } from "expo-router";
import { StarIcon } from "lucide-react-native";

type FilmProps = {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

const FilmCard = ({
  id,
  poster_path,
  title,
  name,
  vote_average,
  release_date,
  first_air_date,
}: FilmProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[31%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600*400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <ThemedText numberOfLines={1} className="font-Poppins text-sm mb-[2px]">
          {title || name}
        </ThemedText>
        <View className="flex-row justify-between items-center">
          <ThemedText className="font-Poppins text-xs">
            {release_date?.split("-")[0] || first_air_date?.split("-")[0]}
          </ThemedText>
          <View className="flex-row items-center gap-1">
            <StarIcon fill={"#f5c211"} size={10} color={"#f5c211"} />
            <ThemedText className="font-PoppinsLight text-xs">
              {Math.round(vote_average)}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default FilmCard;
