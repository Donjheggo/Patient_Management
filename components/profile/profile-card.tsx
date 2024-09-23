import { View } from "react-native";
import { Text } from "../ui/text";
import { usePatient } from "~/context/patient-context";
import { useAuth } from "~/context/auth-context";

export default function ProfileCard() {
  const { user } = useAuth();
  const { patient } = usePatient();
  return (
    <View className="border border-primary rounded-lg p-3">
      <Text className="text-xl">Email: {user?.email}</Text>
      <Text className="text-xl">Name: {patient?.name}</Text>
      <Text className="text-xl">Birth date: {patient && new Date(patient?.birthdate).toLocaleDateString()}</Text>
      <Text className="text-xl">Address: {patient?.address}</Text>
      <Text className="text-xl">Contact number: {patient?.contact_number}</Text>
      <Text className="text-xl">Gender: {patient?.gender}</Text>
    </View>
  );
}
