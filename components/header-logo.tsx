import { View } from "react-native";
import { Text } from "./ui/text";

export default function HeaderLogo() {
  return (
    <View className="flex flex-col">
      <Text>Explore</Text>
      <Text className="text-2xl font-bold text-primary">FPOP</Text>
    </View>
  );
}
