import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { usePatient } from "~/context/patient-context";
import { Redirect } from "expo-router";

export default function Screen() {
  const patient = usePatient();

  if (!patient) {
    return <Redirect href="/(tabs)/patient-registration" />;
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="p-5">
        <View>
          <Text>Booking Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
