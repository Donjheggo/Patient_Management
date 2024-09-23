import { Alert } from "react-native";
import { supabase } from "../supabase";

export async function GetMyAppointments(patient_id: string) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_id", patient_id);

    if (error) {
      Alert.alert(error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    if (error instanceof Error) Alert.alert(error.message);
    return [];
  }
}
