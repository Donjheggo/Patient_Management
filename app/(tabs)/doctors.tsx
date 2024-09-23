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
      <ScrollView className="p-5">
        <Text className="text-center font-semibold text-2xl">Doctors</Text>
        <SearchBar/>
        <View className="mt-5">
          <FlatList
            data={doctors}
            renderItem={({ item, index }) => (
              <DoctorCard key={index} item={item} />
            )}
            contentContainerStyle={{
              flexDirection: "column",
              gap: 10,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export type DoctorsT = Tables<"doctors">;
