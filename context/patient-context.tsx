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

const PatientContext = createContext<PatientT | null>(null);

export default function PatientProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [patient, setPatient] = useState<PatientT | null>(null);

  useEffect(() => {
    const fetchUserPatient = async () => {
      if (user?.id) {
        const response = await GetPatientById(user?.id || "");
        if (response) {
          setPatient(response || null);
        }
      }
    };

    fetchUserPatient();
  }, [user?.id]);

  return (
    <PatientContext.Provider value={patient}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatient = () => useContext(PatientContext);
