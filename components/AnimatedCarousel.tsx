import { useEffect, useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SlideItem } from "./SlideItem";
import { fetch } from "expo/fetch";

type FilmProps = {
  title: string;
  backdrop_image: string;
  genres: string[];
};

export default function AnimatedCarousel() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [films, setFilms] = useState<FilmProps[]>([]);

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

  const getFilms = async () => {
    try {
      const response = await fetch("http://192.168.0.34:3001", {
        headers: { Accept: "application/json" },
      });

      const data = await response.json();
      setFilms(data);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

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
        data={films}
        onProgressChange={progress}
        renderItem={({ item, index }: { item: FilmProps; index: number }) => (
          <SlideItem key={index} item={item} />
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={films}
        dotStyle={{
          backgroundColor: "rgb(255,255,255)",
          borderRadius: 50,
          width: 12,
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
