import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import AppointmentForm from "~/components/book/appointment-form";

export default function Screen() {
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
