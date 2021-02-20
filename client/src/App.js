import { React, useEffect, useState } from 'react';

import Menu from "./components/menu/menu.jsx"
import CarroselPrincipal from "./components/carroselprincipal/carrosselPrincipal"
import Destaques from "./components/destaques/destaques"
import Footer from "./components/footer/footer"
import './App.css';

import BuscaBD from "./components/fetchBackEnd/api"


function App() {

  // const [dadosHome, setDadosHome] = useState(false)

  // useEffect(async () => {
  //   const classBuscaBD = new BuscaBD
  //   const dados = await classBuscaBD.MenuSlideFooter()
  //   setDadosHome(dados)
  // }, [])

  return (
    <div className="App">
      <Menu />
      <CarroselPrincipal />
      <Destaques />
      <Footer />
    </div>
  );
}

export default App;