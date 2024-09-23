import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function GetScheduleById(schedule_id: string) {
  try {
    const { data, error } = await supabase
      .from("doctor_schedules")
      .select("*")
      .eq("id", schedule_id)
      .single();

    if (error) {
      Alert.alert(error.message);
      return false;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return false;
    }
  }
}
