import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView className="p-5">
        <View>
          <Text>Patient Registration Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
