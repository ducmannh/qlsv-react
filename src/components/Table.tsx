import axios from "axios";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../store/StoreContext";
import { Button } from "flowbite-react";

export default function Table() {
  const { studentLists, setStudentLits } = useContext(StoreContext);
  const { selected, setSelected } = useContext(StoreContext);
  const { open, setOpen } = useContext(StoreContext);
  const { faculty, setFaculty } = useContext(StoreContext);
  const [selectStudents, setSelectStudents] = useState<any[]>([]);
  const [selectAllStudents, setSelectAllStudents] = useState(false);
  const isAnySelected = selectStudents.length > 0;
  const [count, setCount] = useState(0);
  const handleDelete = (id: number) => {
    axios({
      method: "delete",
      url: `https://localhost:7227/api/Students/${id}`,
    }).then(function (response) {
      setStudentLits(response.data);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:7227/api/Students",
    }).then(function (response) {
      setStudentLits(response.data);
    });
  }, []);

  const handleEdit = (id: number) => {
    setOpen(true);
    axios({
      method: "get",
      url: `https://localhost:7227/api/Students/${id}`,
    }).then(function (response) {
      setSelected(response.data);
    });
  };
  const facultyMap = new Map();
  faculty.forEach((item: any) => {
    facultyMap.set(item.idFaculty, item.nameFaculty);
  });

  const handleSelectAllStudents = (e: any) => {
    const isChecked = e.target.checked;
    setSelectAllStudents(isChecked);

    if (isChecked) {
      const selectedStudents = studentLists.map((student: any) => ({
        idStudent: student.idStudent,
      }));
      setSelectStudents(selectedStudents);
    } else {
      setSelectStudents([]);
    }
    setCount(studentLists.length);
  };
  const handleSelectedStudent = (event: any, student: any) => {
    if (event.target.checked) {
      setSelectStudents((prev) => [...prev, student]);
      setCount(count + 1);
      if (count === studentLists.length - 1) {
        setSelectAllStudents(true);
      }
    } else {
      setSelectStudents((prevS: any) =>
        prevS.filter((select: any) => select.idStudent !== student.idStudent)
      );
      setSelectAllStudents(false);
      setCount(count - 1);
    }
  };
  const handleDeleteSelected = () => {
    const newStudent = studentLists.filter(
      (student: any) =>
        !selectStudents.some(
          (select: any) => select.idStudent === student.idStudent
        )
    );
    // console.log(selectStudents);
    // axios({
    //   method: "delete",
    //   url: "https://localhost:7227/api/Students/DelelteAll",
    //   data: selectStudents,
    // }).then(function (response) {
    //   console.log(response.data);
    // });
    setStudentLits(newStudent);
    setCount(0);
  };
  return (
    <div>
      {isAnySelected && (
        <Button className="absolute top-32" onClick={handleDeleteSelected}>
          Xóa được chọn
        </Button>
      )}
      <div className="flex justify-center">
        <table className="w-full text-sm text-center text-gray-500 mt-3 relative">
          <thead className="text-xs text-gray-900 uppercase bg-gray-300">
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  checked={selectAllStudents}
                  onChange={(e) => handleSelectAllStudents(e)}
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Ma Sinh Vien
              </th>
              <th scope="col" className="px-6 py-3">
                Ho va Ten
              </th>
              <th scope="col" className="px-6 py-3">
                Ngay Sinh
              </th>
              <th scope="col" className="px-6 py-3">
                Gioi Tinh
              </th>
              <th scope="col" className="px-6 py-3">
                Khoa
              </th>
              <th scope="col" className="px-6 py-3">
                Hanh Dong
              </th>
            </tr>
          </thead>
          <tbody>
            {studentLists.map((student: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectStudents.some(
                      (select: any) => select.idStudent === student.idStudent
                    )}
                    onChange={(e) => handleSelectedStudent(e, student)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-3">{student.idStudent}</td>
                <td className="px-6 py-3">{student.nameStudent}</td>
                <td className="px-6 py-3">{student.birthdayStudent}</td>
                <td className="px-6 py-3">{student.gender}</td>
                <td className="px-6 py-3">
                  {facultyMap.get(student.idFaculty)}
                </td>
                <td className="px-6 py-3">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleEdit(student.idStudent)}
                  >
                    Sua
                  </button>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleDelete(student.idStudent)}
                  >
                    Xoa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
