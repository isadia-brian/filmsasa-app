import FilmCard from "@/components/FilmCard";
import ThemedText from "@/components/ThemedText";
import { fetchFilms } from "@/services/api";
import useFetch from "@/services/useFetch";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";

const SeriesScreen = () => {
  const {
    data: series,
    loading: seriesLoading,
    error: seriesError,
  } = useFetch(() => fetchFilms({ query: "", mediaType: "tv" }));
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 px-4 pt-12"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="mb-2">
          <ThemedText type="title">Series</ThemedText>
        </View>

        {seriesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : seriesError ? (
          <ThemedText type="default">{seriesError.message}</ThemedText>
        ) : (
          <View className="mt-5 flex-1">
            <FlatList
              data={series}
              renderItem={({ item }) => <FilmCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SeriesScreen;
