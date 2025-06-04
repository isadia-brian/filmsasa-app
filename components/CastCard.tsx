import { View, Image } from "react-native";
import ThemedText from "./ThemedText";

type CastCardProps = {
  name: string;
  profile_path: string;
  character: string;
};

const CastCard = ({ name, profile_path, character }: CastCardProps) => {
  return (
    <View className="w-24">
      <View className=" rounded-full w-24 h-24">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w185${profile_path}`,
          }}
          className="h-24 w-24 rounded-full border border-red-500"
          resizeMode="cover"
        />
      </View>
      <View className="flex-col  mt-2 ">
        <ThemedText
          numberOfLines={2}
          className="text-sm font-PoppinsMedium text-center h-[30px]  leading-none"
        >
          {name}
        </ThemedText>
        <ThemedText
          numberOfLines={1}
          className="text-sm font-PoppinsLight text-center leading-none"
        >
          {character}
        </ThemedText>
      </View>
    </View>
  );
};

export default CastCard;
