import { supabase } from "../supabase";
import { Alert } from "react-native";
import type { AppointmentT } from "~/components/book/appointment-form";

export async function CreateAppointment(form: AppointmentT) {
  try {
    if (!form.reason || !form.doctor_id || !form.schedule_id) {
      Alert.alert("Complete all fields");
      return false;
    }
    const { error } = await supabase.from("appointments").insert([
      {
        patient_id: form.patient_id,
        reason: form.reason,
        doctor_id: form.doctor_id,
        schedule_id: form.schedule_id,
        status: form.status,
      },
    ]);
    if (error) {
      Alert.alert(error.message);
      return false;
    }
    Alert.alert("Appointment Success");
    return true;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return false;
    }
  }
}

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
    if (error instanceof Error) {
      Alert.alert(error.message);
      return [];
    }
  }
}
