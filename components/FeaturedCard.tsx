import { Link } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import ThemedText from "./ThemedText";
import { FeaturedCardProps } from "@/types";

const FeaturedCard = ({
  film: { tmdbId, title, posterImage },
}: FeaturedCardProps) => {
  return (
    <Link href={`/movies/${tmdbId}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: posterImage }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
          fadeDuration={300}
        />

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

export default FeaturedCard;
