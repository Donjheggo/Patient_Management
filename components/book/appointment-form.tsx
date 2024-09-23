import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { View } from "react-native";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { usePatient } from "~/context/patient-context";
import { DoctorsT } from "~/app/(tabs)/doctors";
import { GetDoctors, GetDoctorSchedulesById } from "~/lib/actions/doctors";
import { Tables } from "~/database.types";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { CreateAppointment } from "~/lib/actions/appointment";
import { useRouter } from "expo-router";
import { formatScheduleDate } from "~/lib/utils";

export default function AppointmentForm() {
  const { patient } = usePatient();
  const router = useRouter();
  const [doctors, setDoctors] = useState<DoctorsT[]>([]);
  const [schedules, setSchedules] = useState<ScheduleT[]>();
  const [form, setForm] = useState<AppointmentT>({
    patient_id: patient?.id || "",
    reason: "",
    doctor_id: "",
    schedule_id: "",
    status: "PENDING",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await GetDoctors("");
      if (data) setDoctors(data);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchDoctorSchedule = async () => {
      if (form.doctor_id) {
        const data = await GetDoctorSchedulesById(form.doctor_id);
        if (data) setSchedules(data);
      }
    };

    fetchDoctorSchedule();
  }, [form.doctor_id]);

  const handleSubmit = async () => {
    const response = await CreateAppointment(form);
    if (response) router.push("/(tabs)/appointments");
  };

  return (
    <View className="flex-col gap-5">
      <View>
        <Label nativeID="reason" className="pb-1">
          Reason
        </Label>
        <Input
          multiline
          placeholder="Write your reason for appointment here..."
          value={form.reason}
          onChangeText={(e) => setForm({ ...form, reason: e })}
          aria-labelledby="reason"
          aria-errormessage="inputError"
          keyboardType="default"
          style={{ height: 100 }}
        />
      </View>
      <View>
        <Label nativeID="Doctor" className="pb-1">
          Doctor
        </Label>
        <Select
          defaultValue={{ value: "", label: "Select a Doctor" }}
          onValueChange={(value) =>
            setForm({
              ...form,
              doctor_id: value?.value as string,
            })
          }
        >
          <SelectTrigger>
            <SelectValue
              className="text-foreground dark:text-white text-sm native:text-lg"
              placeholder="Select a billing number"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {doctors.map((item, index) => (
                <SelectItem key={index} label={item.name} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
      {schedules && schedules.length === 0 && (
        <Text className="font-semibold pl-2">
          No available schedule, please select another Doctor.
        </Text>
      )}
      {schedules && schedules.length > 0 && (
        <View>
          <Label nativeID="Doctor" className="pb-1">
            Doctor's Schedule
          </Label>
          <Select
            defaultValue={{ value: "", label: "Select a Schedule" }}
            onValueChange={(value) =>
              setForm({
                ...form,
                schedule_id: value?.value as string,
              })
            }
          >
            <SelectTrigger style={{ height: 70 }}>
              <SelectValue
                className="text-foreground dark:text-white text-sm native:text-lg"
                placeholder="Select a doctor's schedule"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {schedules?.map((item, index) => (
                  <SelectItem
                    key={index}
                    label={`${formatScheduleDate(
                      item.start_time
                    )} to \n${formatScheduleDate(item.end_time)}`}
                    value={item.id}
                  ></SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      )}
      <Button onPress={handleSubmit} size="lg" className="mt-4">
        <Text>Submit Appointment</Text>
      </Button>
    </View>
  );
}

export type AppointmentT = {
  patient_id: string;
  reason: string;
  doctor_id: string;
  schedule_id: string;
  status: "PENDING" | "ACCEPTED" | "COMPLETED";
};

export type ScheduleT = Tables<"doctor_schedules">;
