import { useRef } from "react";
import {
  View,
  Dimensions,
  ImageSourcePropType,
  useWindowDimensions,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SlideItem } from "./SlideItem";

const filmData = [
  {
    title: "The Last Of Us",
    image: require("@/assets/images/films/last_of_us_backdrop.jpg"),
  },
  {
    title: "Anora",
    image: require("@/assets/images/films/anora_backdrop.jpg"),
  },
  {
    title: "Sinners",
    image: require("@/assets/images/films/sinners_backdrop.jpg"),
  },
];

type FilmProps = {
  title: string;
  image: ImageSourcePropType;
};

export default function AnimatedCarousel() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { width, height } = useWindowDimensions();

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View id="carousel-component">
      <Carousel
        ref={ref}
        width={width}
        height={height / 2}
        autoPlay={true}
        autoPlayInterval={8000}
        autoPlayReverse={false}
        snapEnabled={true}
        vertical={false}
        pagingEnabled={true}
        loop={true}
        data={filmData}
        onProgressChange={progress}
        renderItem={({ item, index }: { item: FilmProps; index: number }) => (
          <SlideItem key={index} item={item} />
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={filmData}
        dotStyle={{
          backgroundColor: "rgb(255,255,255)",
          borderRadius: 50,
          width: 25,
          height: 4,
        }}
        activeDotStyle={{
          overflow: "hidden",
          backgroundColor: "red",
        }}
        containerStyle={{
          gap: 5,
          marginTop: 10,
          position: "absolute",
          bottom: 5,
        }}
        onPress={onPressPagination}
      />
    </View>
  );
}
