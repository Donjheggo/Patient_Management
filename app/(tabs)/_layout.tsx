import { Tabs, Redirect } from "expo-router";
import { User } from "lucide-react-native";
import { NotebookPen, NotepadText, Hospital } from "lucide-react-native";
import { useAuth } from "~/context/auth-context";
import { usePathname } from "expo-router";

export default function TabLayout() {
  const { user } = useAuth();
  const pathname = usePathname();
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2d9c4b",
        tabBarInactiveTintColor: "#767a83",
        headerShown: false,
        headerTitleStyle: {
          fontSize: 20,
          color: "#2d9c4b",
        },
      }}
    >
      <Tabs.Screen
        name="book"
        options={{
          title: "Book",
          tabBarIcon: ({ color }) => <NotebookPen size={28} color={color} />,
          href: pathname === "/patient-registration" ? null : "/book",
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color }) => <NotepadText size={28} color={color} />,
          href: pathname === "/patient-registration" ? null : "/appointments",
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: "Doctors",
          tabBarIcon: ({ color }) => <Hospital size={28} color={color} />,
          href: pathname === "/patient-registration" ? null : "/doctors",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
          href: pathname === "/patient-registration" ? null : "/profile",
        }}
      />
      <Tabs.Screen
        name="patient-registration"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
