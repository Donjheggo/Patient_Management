import { supabase } from "../supabase";
import { Alert } from "react-native";
import { PatientFormT } from "~/app/(tabs)/patient-registration";

export async function GetPatientById(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error) {
      Alert.alert(error.message)
      return null;
    }
    return data || null;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
      return null;
    }
  }
}

export async function CreatePatient(form: PatientFormT) {
  try {
    const { error } = await supabase.from("patients").insert([
      {
        user_id: form.user_id,
        name: form.name,
        address: form.address,
        birthdate: form.birthdate,
        contact_number: Number(form.contact_number),
        gender: form.gender,
      },
    ]);

    if (error) {
      Alert.alert(error.message);
      return false;
    }
    Alert.alert("Success")
    return true;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return false;
    }
  }
}
