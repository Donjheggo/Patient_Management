import SignoutButton from "~/components/profile/signout-button";
import ProfileCard from "~/components/profile/profile-card";
import StatsCard from "~/components/profile/stats-card";
import { View, SafeAreaView, ScrollView } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { GetMyAppointments } from "~/lib/actions/profile";
import { useState, useCallback } from "react";
import { usePatient } from "~/context/patient-context";
import type { AppointmentT } from "~/components/book/appointment-form";
import { useFocusEffect } from "expo-router";

export default function Screen() {
  const { patient } = usePatient();
  const [data, setData] = useState<StatsT>({
    pending: 0,
    completed: 0,
    total: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await GetMyAppointments(patient?.id || "");
        if (data) {
          const pending = data.filter(
            (item: AppointmentT) => item.status === "PENDING"
          ).length;
          const completed = data.filter(
            (item: AppointmentT) => item.status === "COMPLETED"
          ).length;
          const total = data.length;
          setData({
            pending: pending,
            completed: completed,
            total: total,
          });
        }
      };

      fetchData();
    }, [patient])
  );

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="p-5">
          <ProfileCard />
          <StatsCard name="Pending Appointments" number={data.pending} />
          <StatsCard name="Completed Appoinments" number={data.completed} />
          <StatsCard name="Total Appointments" number={data.total} />
          <View style={{ marginTop: 2 }}>
            <ThemeToggle />
            <SignoutButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type StatsT = {
  pending: number;
  completed: number;
  total: number;
};
