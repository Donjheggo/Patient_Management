import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Tables } from "~/database.types";
import { GetPatientById } from "~/lib/actions/patient";
import { useAuth } from "./auth-context";
import { useEffect } from "react";
export type PatientT = Tables<"patients">;

type PatientContext = {
  patient: PatientT | null;
  loading: boolean;
};

const PatientContext = createContext<PatientContext>({
  patient: null,
  loading: true,
});

export default function PatientProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [patient, setPatient] = useState<PatientT | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserPatient = async () => {
    if (user?.id) {
      setLoading(true);
      const response = await GetPatientById(user?.id || "");
      if (response) setPatient(response || null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserPatient();
    } else {
      setPatient(null);
      setLoading(false);
    }
  }, [user?.id]);

  return (
    <PatientContext.Provider value={{ patient, loading }}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatient = () => useContext(PatientContext);
