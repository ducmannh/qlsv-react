import { Button } from "flowbite-react";
import { Box, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import StoreContext from "../store/StoreContext";

interface Faculty {
  idFaculty: number;
  nameFaculty: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};

export default function Input() {
  const { studentLists, setStudentLits } = useContext(StoreContext);
  const { open, setOpen } = useContext(StoreContext);
  const { selected, setSelected } = useContext(StoreContext);
  const {faculty, setFaculty} = useContext(StoreContext);
  const [idStudent, setIdStudent] = useState("");
  const [nameStudent, setNameStudent] = useState("");
  const [birthdayStudent, setBirthdayStudent] = useState("");
  const [gender, setGender] = useState("");
  const [idFaculty, setIdFaculty] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddStudent = () => {
    const newStudentLists = {
      idStudent,
      nameStudent,
      birthdayStudent,
      gender,
      idFaculty,
    };
    try {
      axios
        .post("https://localhost:7227/api/Students", newStudentLists)
        .then(function (response) {
          setStudentLits(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
    handleClose();
    handleDeleteInput();
  };
  const handleDeleteInput = () => {
    setIdStudent("");
    setNameStudent("");
    setBirthdayStudent("");
    setIdFaculty("");
  };
  const handleUpdateStudent = () => {
    const updatedStudent = {
      idStudent,
      nameStudent,
      birthdayStudent,
      gender,
      idFaculty,
    };
    axios({
      method: "put",
      url: `https://localhost:7227/api/Students/${idStudent}`,
      data: updatedStudent,
    }).then(function (response) {
      setStudentLits(response.data);
      handleClose();
      handleDeleteInput();
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:7227/api/Faculties",
    }).then(function (response) {
      setFaculty(response.data);
    });
  }, []);
  useEffect(() => {
    if (selected) {
      setIdStudent(selected.idStudent);
      setNameStudent(selected.nameStudent);
      setBirthdayStudent(selected.birthdayStudent);
      setGender(selected.gender);
      setIdFaculty(selected.idFaculty);
    }
  }, [selected]);
  return (
    <div>
      <div className="flex justify-center">
        <Button onClick={handleOpen}>Them Sinh Vien</Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 className="mb-4 text-3xl text-center mt-0">Them Sinh Vien</h2>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ma Sinh Vien
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={idStudent}
              onChange={(e) => setIdStudent(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ho va Ten
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={nameStudent}
              onChange={(e) => setNameStudent(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngay Sinh
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={birthdayStudent}
              onChange={(e) => setBirthdayStudent(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Gioi Tinh
            </label>
            <div className="flex">
              <div className="flex items-center pl-4 border border-gray-200 rounded-lg px-12 mr-3 bg-gray-50">
                <input
                  id="radioMale"
                  type="radio"
                  value="Nam"
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  onChange={(e) => {
                    if (e.target.id === "radioMale" && e.target.checked) {
                      setGender(e.target.value);
                    }
                  }}
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900">
                  Nam
                </label>
              </div>
              <div className="flex items-center pl-4 border border-gray-200 rounded-lg px-14 bg-gray-50">
                <input
                  id="radioFemale"
                  type="radio"
                  value="Nu"
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 "
                  onChange={(e) => {
                    if (e.target.id === "radioFemale" && e.target.checked) {
                      setGender(e.target.value);
                    }
                  }}
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900">
                  Nu
                </label>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Khoa
            </label>
            {
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={idFaculty}
                onChange={(e) => setIdFaculty(e.target.value)}
              >
                <option value=""></option>
                {faculty.map((item: any, index: number) => {
                  return (
                    <option key={index} value={item.idFaculty}>
                      {item.nameFaculty}
                    </option>
                  );
                })}
              </select>
            }
          </div>
          <div className="flex justify-between">
            <Button onClick={handleAddStudent}>Them Sinh Vien</Button>
            <Button onClick={handleUpdateStudent}>Cap Nhat</Button>
            <Button onClick={handleDeleteInput}>Xoa Input</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
