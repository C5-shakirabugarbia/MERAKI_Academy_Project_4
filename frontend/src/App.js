import { Route, Routes } from "react-router-dom";
import "./App.css";
import FirstNavbar from "./components/Navbar/firstNavbar";
import Register from "./components/Register/Register";
function App() {
  return (
    <div className="App">
      <FirstNavbar />
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
