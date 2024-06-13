import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Form from "./components/Form";
import TableWrapper from "./components/TableWrapper";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element=<Form /> />
          <Route path="/Table" element=<TableWrapper /> />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
