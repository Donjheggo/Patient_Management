import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import AppointmentForm from "~/components/book/appointment-form";
import { usePatient } from "~/context/patient-context";
import { Redirect } from "expo-router";

export default function Screen() {
  const { patient, loading } = usePatient();

  if (!loading) {
    if (!patient) {
      return <Redirect href="/(tabs)/patient-registration" />;
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="p-5">
        <View>
          <Text className="text-center text-2xl font-semibold text-primary">
            Book an Appointment
          </Text>
          <AppointmentForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
