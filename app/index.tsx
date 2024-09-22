import { View, Image, ScrollView, Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();
  return (
    <ScrollView className="h-full">
      <View className="min-h-[70vh] flex justify-center items-center gap-5 p-5">
        <Image
          source={require("../assets/images/index.png")}
          resizeMode="contain"
          style={{ width: 300, height: 160 }}
        />

        <Text className="font-semibold text-xl text-center opacity-80 dark:text-white">
          Book Appointments Effortlessly with Trusted Healthcare Professionals.
        </Text>

        <Pressable
          onPress={() => router.push("/(auth)/sign-in")}
          className="w-full"
        >
          <View className="w-full border text-center border-primary bg-primary rounded-lg p-5 items-center flex justify-center overflow-hidden">
            <Text className="text-xl text-white">Get Started</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
