import { images } from "@/constants/images/images";
import { TrendingCardProps } from "@/types";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ThemedText from "./ThemedText";

const TrendingCard = ({
  film: { tmdbId, title, posterImage, mediaType },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${tmdbId}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: posterImage }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full z-20">
          <MaskedView
            maskElement={
              <Text className="font-PoppinsBold text-black text-6xl">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <ThemedText
          className="text-sm font-PoppinsMedium mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
