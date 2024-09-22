import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function GetPatientById(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error) {
      return null;
    }
    return data || null;
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
}
