import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cars from "./components/Cars";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cars />} />
      </Routes>
    </div>
  );
}

export default App;
