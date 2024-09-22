import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function BackButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push("../")}>
      <ChevronLeft color="#2d9c4b" size={30} />
    </Pressable>
  );
}
