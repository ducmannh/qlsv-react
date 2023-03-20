import { Route, Routes } from "react-router-dom";
import "./App.css";
import Input from "./component/Input";
import Search from "./component/Search";
import Table from "./component/Table";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/table" element={<Table />} />
          <Route path="/input" element={<Input />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
