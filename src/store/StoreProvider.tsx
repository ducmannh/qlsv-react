import { ReactNode, useState } from "react";
import StoreContext from "./StoreContext";

interface DataStore {
  children: ReactNode;
}

export default function StoreProvider({ children }: DataStore) {
  const [studentLists, setStudentLits] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <StoreContext.Provider
      value={{
        studentLists,
        setStudentLits,
        selected,
        setSelected,
        open,
        setOpen,
        faculty,
        setFaculty,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
