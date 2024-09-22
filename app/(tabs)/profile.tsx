import { View, SafeAreaView, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/auth-context";
import SignoutButton from "~/components/profile/signout-button";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function Screen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="p-5">
          <Text className="text-center text-2xl">{user?.email}</Text>
          <View style={{ marginTop: 2 }}>
            <ThemeToggle />
            <SignoutButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
