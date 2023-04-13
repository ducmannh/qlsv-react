import React from "react";
import { Link } from "react-router-dom";
import css from "../styles/Header.module.css";
export default function Header() {
  return (
    <div>
      <h1>QUẢN LÝ SINH VIÊN</h1>
      <div className={css.header}>
        <Link className={css.link1} to="/table">Danh Sách Sinh Viên</Link>
        <Link className={css.link1} to="/search">Tìm Kiếm Sinh Viên</Link>
        <Link className={css.link1} to="/input">Sinh Viên</Link>
      </div>
    </div>
  );
}
