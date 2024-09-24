import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Alert, SafeAreaView, ScrollView, View, Platform } from "react-native";
import { Text } from "~/components/ui/text";
import { CreatePatient } from "~/lib/actions/patient";
import { useState } from "react";
import { useAuth } from "~/context/auth-context";
import { Redirect, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import SignoutButton from "~/components/profile/signout-button";
import { usePatient } from "~/context/patient-context";

export default function Screen() {
  const router = useRouter();
  const { user } = useAuth();
  const { patient, loading } = usePatient();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  if(!loading && patient){
    return <Redirect href="/(tabs)/book"/>
  }

  const [form, setForm] = useState<PatientFormT>({
    user_id: user?.id || "",
    name: "",
    address: "",
    birthdate: new Date(),
    contact_number: "",
    gender: undefined,
  });

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.address ||
      !form.birthdate ||
      !form.contact_number ||
      !form.gender
    ) {
      Alert.alert("Complete all fields");
      return;
    }
    const response = await CreatePatient(form);
    if (response === true) {
      router.push("/(tabs)/book");
    }
  };

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 2,
    right: 12,
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="p-5">
        <Text className="text-center text-2xl font-semibold text-primary">
          Patient Registration
        </Text>
        <View className="flex-col gap-2">
          <View>
            <Label nativeID="name" className="pb-1">
              Full name
            </Label>
            <Input
              placeholder="Firstname Middle Lastname"
              value={form.name}
              onChangeText={(e) => setForm({ ...form, name: e })}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              keyboardType="default"
            />
          </View>
          <View>
            <Label nativeID="birthdate" className="pb-1">
              Birth date
            </Label>
            {Platform.OS === "android" && (
              <Button
                variant="outline"
                onPress={() => setShowDatePicker(!showDatePicker)}
                className="bg-transparent w-1/4"
              >
                <Text>{new Date(form.birthdate).toLocaleDateString()}</Text>
              </Button>
            )}
            {(showDatePicker || Platform.OS === "ios") && (
              <View className="mr-auto">
                <RNDateTimePicker
                  value={form.birthdate}
                  display="default"
                  mode="date"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setForm({ ...form, birthdate: selectedDate });
                      setShowDatePicker(false);
                    }
                  }}
                />
              </View>
            )}
          </View>
          <View>
            <Label nativeID="address" className="pb-1">
              Address
            </Label>
            <Input
              placeholder="Complete Address"
              value={form.address}
              onChangeText={(e) => setForm({ ...form, address: e })}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              keyboardType="default"
            />
          </View>
          <View>
            <Label nativeID="contact_number" className="pb-1">
              Contact number
            </Label>
            <Input
              placeholder="09000000000"
              value={form.contact_number}
              onChangeText={(e) => setForm({ ...form, contact_number: e })}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              keyboardType="default"
            />
          </View>
          <View>
            <Label nativeID="gender" className="pb-1">
              Gender
            </Label>
            <Select
              defaultValue={{ value: "", label: "Select" }}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  gender: value?.value as "MALE" | "FEMALE" | undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue
                  className="text-foreground dark:text-white text-sm native:text-lg"
                  placeholder="Choose Gender"
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets}>
                <SelectGroup>
                  {gender.map((item, index) => (
                    <SelectItem key={index} label={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>
        </View>
        <Button className="mt-5" size="lg" onPress={handleSubmit}>
          <Text style={{ fontSize: 18 }}>Submit</Text>
        </Button>
        <SignoutButton />
      </ScrollView>
    </SafeAreaView>
  );
}

export const gender = ["MALE", "FEMALE"];
export type PatientFormT = {
  user_id: string | null;
  name: string;
  address: string;
  birthdate: Date;
  contact_number: string;
  gender: "MALE" | "FEMALE" | undefined;
};
