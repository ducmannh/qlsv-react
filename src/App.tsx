import Header from "./components/Header";
import Input from "./components/Input";
import Table from "./components/Table";
import StoreProvider from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Header />
      <Input />
      <Table />
    </StoreProvider>
  );
}

export default App;
