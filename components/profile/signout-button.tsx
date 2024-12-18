import { supabase } from "~/lib/supabase";
import { LogOut } from "lucide-react-native";
import { Button } from "../ui/button";
import { Text } from "~/components/ui/text";

export default function SignoutButton() {
  const handleSignout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button
      size="lg"
      onPress={handleSignout}
      className="w-full border border-primary mt-4 rounded-lg flex-row items-center"
    >
      <LogOut size={20} color="#eaeaf5" />
      <Text className="ml-2" style={{ fontSize: 18 }}>
        Signout
      </Text>
    </Button>
  );
}
