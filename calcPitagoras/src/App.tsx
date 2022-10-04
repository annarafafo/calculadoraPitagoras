import "./App.css";
import tri from "./assets/tri.png";
import { Calculadora } from "./components/calculadora";

function App() {
  return (
    <div>
      <div className="flex flex-row justify-around">
        <img src={tri} />
        <Calculadora />
      </div>
    </div>
  );
}

export default App;
