import React, { useMemo } from "react";
import {
  ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  Text,
  View,
  type ViewProps,
} from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ImageStyle>;
  index?: number;
  item: {
    image: ImageSourcePropType;
    title: string;
  };
}

export const SlideItem: React.FC<Props> = (props) => {
  const { item, index = 0, ...animatedViewProps } = props;

  const source = useMemo(() => item.image, [index, item.image]);

  return (
    <Animated.View className={"flex-1"} {...animatedViewProps}>
      <Animated.Image
        className={"h-full w-full"}
        source={source}
        resizeMode="cover"
      />
      <View className="absolute h-full w-full left-0 top-0 bg-gradient-to-tr from-black via-black/5 to-transparent">
        <View className="absolute bottom-16 left-4 w-[230px]">
          <Text className="font-AquireBold text-5xl z-20 text-white line-clamp-3">
            {item.title}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};
