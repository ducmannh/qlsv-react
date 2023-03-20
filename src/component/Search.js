import React, { useEffect, useState } from "react";
import css from "../styles/Search.module.css";
import Table from "./Table";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    if (searchInput) {
      const tableData = JSON.parse(localStorage.getItem("students"));
      const searchResult = tableData.filter((student) =>
        student.id.includes(searchInput)
      );
      setSearch(searchResult);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      setShowSearch(false);
    }
  }, [searchInput]);
  // const handleSearchClick = (e) => {
  //   setSearch(e.target.value)
  // }
  // useEffect(() => {
  //   if (searchInput) {
  //     const tableData = JSON.parse(localStorage.getItem("students"));
  //     const searchResult = tableData.filter((student) =>
  //       student.id.includes(searchInput)
  //     );
  //     setSearch(searchResult);
  //     setShowSearch(true);
  //   } else {
  //     setShowSearch(false);
  //     //alert("Không tìm thấy");
  //   }
  // });
  return (
    <div>
      <div className={css.div4}>
        <input
          className={css.input}
          type="text"
          placeholder="Tìm Kiếm"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className={css.button} onClick={handleSearchClick}>
          Tìm Kiếm
        </button>
      </div>
      {showSearch ? (
        <div className={css.div5}>
          <h1>DANH SÁCH SINH VIÊN </h1>
          <table>
            <thead>
              <tr>
                <th>Mã Sinh Viên</th>
                <th>Tên Sinh Viên</th>
                <th>Ngày Sinh</th>
                <th>Giới Tính</th>
                <th>Khoa</th>
              </tr>
            </thead>
            <tbody>
              {search.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.date}</td>
                    <td>{student.gender}</td>
                    <td>{student.faculty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Table />
      )}
    </div>
  );
}
