import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Tables } from "~/database.types";
import { GetPatientById } from "~/lib/actions/patient";
import { useAuth } from "./auth-context";
export type PatientT = Tables<"patients">;

type PatientContext = {
  patient: PatientT | null;
  refetch: () => void;
};

const PatientContext = createContext<PatientContext>({
  patient: null,
  refetch: () => undefined
});

export default function PatientProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [patient, setPatient] = useState<PatientT | null>(null);

  const fetchUserPatient = async () => {
    if (user?.id) {
      const response = await GetPatientById(user?.id || "");
      if (response) {
        setPatient(response || null);
      }
    }
  };

  useEffect(() => {
    fetchUserPatient();
  }, [user?.id]);

  const refetch = async () => {
    await fetchUserPatient();
  };

  return (
    <PatientContext.Provider value={{ patient, refetch }}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatient = () => useContext(PatientContext);
