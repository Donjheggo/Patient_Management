import { Input } from "~/components/ui/input";
import { useLocalSearchParams, router } from "expo-router";
import { useDebouncedCallback } from "use-debounce"; // delay the function
import { Search } from "lucide-react-native";
import { View, StyleSheet } from "react-native";

export default function SearchBar() {
  const params = useLocalSearchParams<{ query?: string }>();

  const handleSearch = useDebouncedCallback((search: string) => {
    router.setParams({ query: search });
  }, 300);

  return (
    <View className="relative justify-center mt-5">
      <Search style={styles.icon} />
      <Input
        style={{ paddingLeft: 40, fontSize: 17 }}
        className="dark:bg-black dark:text-white border border-primary"
        placeholder="Search name..."
        defaultValue={params.query}
        onChangeText={(text) => {
          handleSearch(text);
        }}
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
    color: "#16a34a",
  },
});
