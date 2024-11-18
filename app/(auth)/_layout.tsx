import { View, SafeAreaView, ScrollView, AppState } from "react-native";
import { supabase } from "~/lib/supabase";
import { Slot } from "expo-router";
import { useAuth } from "~/context/auth-context";
import { usePatient } from "~/context/patient-context";
import { Redirect } from "expo-router";
import { Image } from "expo-image";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthLayout = () => {
  const { user } = useAuth();
  const { patient, loading } = usePatient();

  if (user && !loading && patient) {
    return <Redirect href="/(tabs)/book" />;
  } else if (user && !loading && !patient) {
    return <Redirect href="/(tabs)/patient-registration" />;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex">
        <View className="flex-1 mt-10 items-center gap-5 p-6">
          <Image
            source={require("../../assets/images/icon.png")}
            contentFit="contain"
            style={{ width: 500, height: 200 }}
          />
          <Slot />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;
