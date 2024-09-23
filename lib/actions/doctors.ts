import { supabase } from "../supabase";
import { Alert } from "react-native";

export async function GetDoctors(searchQuery: string) {
  try {
    let query = supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = searchQuery
      ? await query.textSearch("name", searchQuery)
      : await query;

    if (error) {
      Alert.alert(error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return [];
    }
  }
}

export async function GetDoctorSchedulesById(doctor_id: string) {
  try {
    const { data, error } = await supabase
      .from("doctor_schedules")
      .select("*")
      .eq("doctor_id", doctor_id);

    if (error) {
      Alert.alert(error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return [];
    }
  }
}

export async function GetDoctorById(doctor_id: string) {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", doctor_id)
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
