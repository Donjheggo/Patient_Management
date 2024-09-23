import { View } from "react-native";
import { Text } from "../ui/text";
import type { AppointmentT } from "../book/appointment-form";
import { useEffect, useState } from "react";
import { GetDoctorById } from "~/lib/actions/doctors";
import { GetScheduleById } from "~/lib/actions/schedule";
import type { DoctorsT } from "~/app/(tabs)/doctors";
import type { ScheduleT } from "../book/appointment-form";
import { formatScheduleDate } from "~/lib/utils";

export default function AppointmentCard({ item }: { item: AppointmentT }) {
  const [data, setData] = useState<DoctorAndScheduleT>({
    doctor: null,
    schedule: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [doctor, schedule] = await Promise.all([
        GetDoctorById(item.doctor_id),
        GetScheduleById(item.schedule_id),
      ]);
      if (doctor) {
        setData((prevData) => ({ ...prevData, doctor: doctor }));
      }
      if (schedule) {
        setData((prevData) => ({ ...prevData, schedule: schedule }));
      }
    };

    fetchData();
  }, [item.doctor_id, item.schedule_id]);

  return (
    <View className="border border-primary rounded-lg p-4">
      <Text className="text-xl">
        <Text className="font-semibold text-xl">Reason: </Text>
        {item.reason}
      </Text>
      <Text className="text-xl">
        <Text className="font-semibold text-xl">Doctor: </Text>{" "}
        {data.doctor?.name}
      </Text>
      <Text className="text-xl">
        <Text className="font-semibold text-xl">Schedule: </Text>
        {"\n"}
        {formatScheduleDate(data.schedule?.start_time)} to {"\n"}
        {formatScheduleDate(data.schedule?.end_time)}
      </Text>
      <Text className="text-xl mt-2 text-primary">
        <Text className="font-semibold text-xl">Status: </Text> {item.status}
      </Text>
    </View>
  );
}

type DoctorAndScheduleT = {
  doctor: DoctorsT | null;
  schedule: ScheduleT | null;
};
