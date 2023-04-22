import { useContext, useEffect, useState } from "react";
import StoreContext from "../store/StoreContext";
import axios from "axios";

export default function Header() {
  const { studentLists, setStudentLits } = useContext(StoreContext);
  const [studentListOriginal, setStudentListOriginal] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "https://localhost:7227/api/Students",
    }).then(function (response) {
      setStudentListOriginal(response.data);
    });
  }, []);
  const handleSearch = () => {
    if (search) {
      const searchResult = studentLists.filter((student: any) => {
        return (
          student.idStudent === parseInt(search) ||
          student.nameStudent.toLowerCase().includes(search.toLowerCase())
        );
      });
      setStudentLits(searchResult);
    } else {
      setStudentLits(studentListOriginal);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl mb-3 mt-5">DANH SÁCH SINH VIÊN</h1>
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-4 px-72 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 ml-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            Tim kiem
          </button>
        </div>
      </div>
    </div>
  );
}
