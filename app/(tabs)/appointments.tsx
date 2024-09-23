import { SafeAreaView, ScrollView, View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { GetMyAppointments } from "~/lib/actions/appointment";
import type { AppointmentT } from "~/components/book/appointment-form";
import AppointmentCard from "~/components/appointments/appointment-card";
import { usePatient } from "~/context/patient-context";

export default function Screen() {
  const { patient } = usePatient();
  const [appointments, setAppointments] = useState<AppointmentT[]>();

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        const data = await GetMyAppointments(patient?.id || "");
        if (data) setAppointments(data);
      };
      fetchAppointments();
    }, [])
  );

  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Text className="text-center text-2xl text-primary font-semibold">
          My Appointments
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments}
          renderItem={({ item, index }) => (
            <AppointmentCard item={item} key={index} />
          )}
          contentContainerStyle={{
            marginTop: 20,
            gap: 13,
            paddingBottom: 50,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
