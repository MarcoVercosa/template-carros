import Menu from "./components/menu/menu.jsx"
import CarroselPrincipal from "./components/carroselprincipal/carrosselPrincipal"
import Destaques from "./components/destaques/destaques"
import './App.css';

function App() {
  return (
    <div className="App">
      <Menu />
      <CarroselPrincipal />
      <Destaques />
    </div>
  );
}

export default App;
