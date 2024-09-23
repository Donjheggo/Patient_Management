import { View } from "react-native";
import { Text } from "../ui/text";

export default function StatsCard({
  name,
  number,
}: {
  name: string;
  number: number;
}) {
  return (
    <View className="w-full border border-primary mt-4 rounded-lg" style={{padding: 10}}>
      <Text className="text-2xl text-primary font-semibold text-center">{number}</Text>
      <Text className="text-xl text-center">{name}</Text>
    </View>
  );
}
