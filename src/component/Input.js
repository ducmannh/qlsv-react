import React, { useState, useEffect, useRef } from "react";
import css from "../styles/Input.module.css";
import Table from "./Table";
import { useLocation } from "react-router-dom";
export default function Input() {
  const [students, setStudents] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [faculty, setFaculty] = useState("");
  const idRef = useRef();
  const handleAddClick = () => {
    if (id && name && date && gender && faculty) {
      const idDuplicated = students.some((student) => student.id === id);
      if (idDuplicated) {
        alert("ID trùng nhau");
      } else {
        const newStudent = {
          id,
          name,
          date,
          gender,
          faculty,
        };
        setStudents([...students, newStudent]);
        console.log(newStudent);
        setID("");
        setName("");
        setDate("");
        setGender("");
        setFaculty("");
        localStorage.setItem(
          "students",
          JSON.stringify([...students, newStudent])
        );
      }
    } else {
      alert("Vui lòng nhập đủ thông tin");
    }
  };
  const handleUpdateClick = () => {
    idRef.current.disabled = false;
    const tableData = JSON.parse(localStorage.getItem("students"));
    const updatedData = tableData.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          name,
          date,
          gender,
          faculty,
        };
      }
      return student;
    });
    setStudents(updatedData);
    localStorage.setItem("students", JSON.stringify(updatedData));
    setID("");
    setName("");
    setDate("");
    setGender("");
    setFaculty("");
  };
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setID(query.get("id"));
    setName(query.get("name"));
    setDate(query.get("date"));
    setGender(query.get("gender"));
    setFaculty(query.get("faculty"));
  }, [location.search]);
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  return (
    <div>
      <div className={css.div1}>
        <div className={css.div2}>
          <label>
            Mã Sinh Viên{" "}
            <input
              ref={idRef}
              value={id || ""}
              className={css.input0}
              type="number"
              placeholder="Nhập mã sinh viên"
              onChange={(e) => setID(e.target.value)}
              // disabled={isDisabled}
            />
          </label>
          <label>
            Tên Sinh Viên{" "}
            <input
              value={name || ""}
              className={css.input0}
              type="text"
              placeholder="Nhập tên sinh viên"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Ngày Sinh{" "}
            <input
              value={date || ""}
              className={css.input1}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Giới Tính
            <select
              value={gender || ""}
              className={css.input2}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="0"></option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </label>
          <label>
            Khoa
            <select
              value={faculty || ""}
              className={css.input3}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="0"></option>
              <option value="Công nghệ thông tin">Công nghệ thông tin</option>
              <option value="Vật Lý">Vật Lý</option>
              <option value="Điện-Điện tử">Điện-Điện tử</option>
              <option value="Kế Toán">Kế Toán</option>
            </select>
          </label>
          <button className={css.button1} onClick={handleAddClick}>
            Thêm Mới
          </button>
          <button className={css.button1} onClick={handleUpdateClick}>
            Cập nhật
          </button>
        </div>
        <Table handleAddStudent={handleAddClick} idRef={idRef} />
      </div>
    </div>
  );
}
