import CastCard from "@/components/CastCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { fetchFilmDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StarIcon, CircleArrowLeft } from "lucide-react-native";
import {
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

const FilmDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const convertedId = Number(id);

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() =>
    fetchFilmDetails({ mediaType: "movie", tmdbId: convertedId }),
  );

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View className="flex-1 relative">
          <Image
            source={{
              uri: movie?.backdropImage
                ? `https://image.tmdb.org/t/p/w780${movie.backdropImage}`
                : "https://placehold.co/600*400/1a1a1a/ffffff.png",
            }}
            className={`w-full h-[440px]`}
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute left-4 flex items-center justify-center top-8 h-10 w-10 bg-black/15  rounded-full"
            onPress={router.back}
          >
            <CircleArrowLeft size={30} color={"white"} strokeWidth={1.25} />
          </TouchableOpacity>
        </View>
        <ThemedView>
          <View className="mb-1">
            <ThemedText type="subtitle">{movie?.title}</ThemedText>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <ThemedText className="text-sm font-PoppinsLight">
                {movie?.year}
              </ThemedText>
              <ThemedText className="text-sm font-PoppinsLight">
                {movie?.runtime}
              </ThemedText>
            </View>
            {movie && movie.vote_average && (
              <View className="flex-row items-center gap-1">
                <StarIcon fill={"#f5c211"} size={12} color={"#f5c211"} />
                <ThemedText className="font-PoppinsLight text-sm">
                  {Math.round(movie.vote_average)}/10
                </ThemedText>
              </View>
            )}
          </View>
          <View className=" mb-4">
            <ThemedText className="mb-[6px] font-PoppinsLight text-sm">
              Overview
            </ThemedText>
            <ThemedText
              numberOfLines={6}
              className="font-Poppins text-[14px] text-pretty"
            >
              {movie?.overview}
            </ThemedText>
          </View>
          <View className="mb-4">
            <ThemedText className="mb-3 font-PoppinsLight text-sm">
              Genres
            </ThemedText>
            <View className="flex-row items-center gap-2">
              {movie?.genres.slice(0, 3).map((genre, idx) => (
                <View
                  key={idx}
                  className="border-[0.8px] border-neutral-400 rounded px-2 py-[2px]"
                >
                  <ThemedText className="text-sm font-PoppinsLight">
                    {genre}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
          {movie && movie.cast && (
            <View className="mb-4">
              <ThemedText className="mb-3 font-PoppinsLight text-sm">
                Cast
              </ThemedText>
              <View>
                <FlatList
                  data={movie.cast}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <CastCard {...item} />}
                  keyExtractor={(item) => item.name.toString()}
                  className="pb-32"
                  contentContainerStyle={{
                    gap: 12,
                  }}
                />
              </View>
            </View>
          )}
        </ThemedView>
      </ScrollView>
    </View>
  );
};

export default FilmDetails;
