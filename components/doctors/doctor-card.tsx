import { View } from "react-native";
import { Text } from "../ui/text";
import { DoctorsT } from "~/app/(tabs)/doctors";

export default function DoctorCard({ item }: { item: DoctorsT }) {
  return (
    <View className="border-primary border rounded-lg p-2">
      <View>
        <Text className="text-center text-xl font-semibold">{item.name}</Text>
      </View>
      <View>
        <Text className="text-center text-xl">{item.specialization}</Text>
      </View>
    </View>
  );
}
