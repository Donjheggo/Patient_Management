import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, View } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { MoonStar } from "~/lib/icons/MoonStar";
import { Sun } from "~/lib/icons/Sun";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      variant="outline"
      size="lg"
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark";
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem("theme", newTheme);
      }}
      className="mt-4 web:ring-offset-background border-primary bg-transparent web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            "flex-1 flex-row justify-center items-center web:px-5",
            pressed && "opacity-70"
          )}
        >
          {isDarkColorScheme ? (
            <MoonStar size={22} color="#16a34a" />
          ) : (
            <Sun size={22} color="#16a34a" />
          )}
          <Text className="text-primary dark:text-primary" style={{ fontSize: 18, marginLeft: 5 }}>Theme</Text>
        </View>
      )}
    </Button>
  );
}
