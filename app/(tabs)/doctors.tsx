import { SafeAreaView, ScrollView, View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { useState, useEffect } from "react";
import { Tables } from "~/database.types";
import { GetDoctors } from "~/lib/actions/doctors";
import DoctorCard from "~/components/doctors/doctor-card";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "~/components/doctors/search-bar";

export default function Screen() {
  const { query } = useLocalSearchParams();
  const [doctors, setDoctors] = useState<DoctorsT[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await GetDoctors(query as string);
      if (data) setDoctors(data);
    };

    fetchDoctors();
  }, [query]);

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="text-center text-primary font-semibold text-2xl">Doctors</Text>
        <SearchBar />
      </View>
      <FlatList
        data={doctors}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <DoctorCard key={index} item={item} />}
        contentContainerStyle={{
          flexDirection: "column",
          gap: 10,
          paddingHorizontal: 20,
          paddingBottom: 50
        }}
      />
    </SafeAreaView>
  );
}

export type DoctorsT = Tables<"doctors">;
