import React, { useMemo } from "react";
import {
  type ImageStyle,
  type StyleProp,
  Text,
  Image,
  View,
  type ViewProps,
} from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ImageStyle>;
  index?: number;
  item: {
    backdrop_image: string;
    title: string;
    genres: string[];
  };
}

export const SlideItem: React.FC<Props> = (props) => {
  const { item, index = 0, ...animatedViewProps } = props;

  const source = useMemo(
    () => item.backdrop_image,
    [index, item.backdrop_image],
  );

  const genres = item.genres;

  return (
    <Animated.View className={"flex-1"} {...animatedViewProps}>
      <Image
        className={"h-full w-full"}
        source={{ uri: source }}
        resizeMode="cover"
      />
      <View className="absolute h-full w-full left-0 top-0 bg-gradient-to-tr from-black via-black/5 to-transparent">
        <View className="absolute bottom-16 left-4 w-[230px]">
          <Text className="font-AquireBold mb-2 text-5xl z-20 text-white line-clamp-3">
            {item.title}
          </Text>
          <View className="flex-1 flex-row gap-2">
            {genres.map((genre, index) => (
              <Text key={index} className="text-white z-20 font-PoppinsLight">
                {genre}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
