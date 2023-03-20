import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "../styles/Table.module.css";

export default function Table({ handleAddStudent, idRef }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const isAnySelected = selected.length > 0;

  const handleSelectedStudent = (event, student) => {
    if (event.target.checked) {
      setSelected((prev) => [...prev, student]);
    } else {
      setSelected((prevS) =>
        prevS.filter((select) => select.id !== student.id)
      );
    }
  };

  const handleDeleteSelected = () => {
    const newStudent = students.filter(
      (student) => !selected.some((select) => select.id === student.id)
    );
    console.log(newStudent);
    setStudents(newStudent);
    localStorage.setItem("students", JSON.stringify(newStudent));
    setSelected([]);
  };

  const handleDelete = (id) => {
    const deleteStudent = students.filter((student) => student.id !== id);
    setStudents(deleteStudent);
    localStorage.setItem("students", JSON.stringify(deleteStudent));
    console.log(deleteStudent);
  };

  const handleEditClick = (student) => {
    if (idRef) console.log((idRef.current.disabled = true));
    // setIsDisabled(true)
    navigate(
      `/input?id=${student.id}&name=${student.name}&date=${student.date}&gender=${student.gender}&faculty=${student.faculty}`
    );
    console.log("aaa");
  };
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      storedStudents.sort((a, b) => a.id - b.id);
      setStudents(storedStudents);
    }
  }, [handleAddStudent]);

  return (
    <div>
      <div className={css.div3}>
        {localStorage.getItem("students") && (
          <div className={css.div3}>
            <h1>DANH SÁCH SINH VIÊN</h1>
            <table>
              <thead>
                <tr>
                  <th>
                    {isAnySelected && (
                      <button
                        className={css.button2}
                        onClick={(e) => handleDeleteSelected(e)}
                      >
                        Xóa được chọn
                      </button>
                    )}
                  </th>
                  <th>Mã Sinh Viên</th>
                  <th>Tên Sinh Viên</th>
                  <th>Ngày Sinh</th>
                  <th>Giới Tính</th>
                  <th>Khoa</th>
                  <th colSpan={2}>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          checked={selected.some(
                            (select) => select.id === student.id
                          )}
                          onChange={(e) => handleSelectedStudent(e, student)}
                        />
                      </td>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.date}</td>
                      <td>{student.gender}</td>
                      <td>{student.faculty}</td>
                      <td>
                        <button
                          className={css.button2}
                          onClick={() => handleEditClick(student)}
                        >
                          Sửa
                        </button>
                      </td>
                      <td>
                        <button
                          className={css.button2}
                          onClick={() => handleDelete(student.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
