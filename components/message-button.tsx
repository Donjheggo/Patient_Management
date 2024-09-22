import { MessageSquareMore } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function MessageButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push("/(tabs)/messages")}>
      <MessageSquareMore color="#2d9c4b" />
    </Pressable>
  );
}
