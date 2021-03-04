import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './index.css';
import App from './App';
import Paineladministrativo from "./components/painelAdministrativo/painel/painelAdministrativo.jsx"
import Estoque from "./components/estoque/estoque"
import DetalhesAnuncio from "./components/detalhesAnuncio/detalhesAnuncio"
import Blindados from "./components/blindados/blindados"
import Novos from "./components/novos/novos"
import Vender from "./components/vender/vender"
import Contato from "./components/contato/contato"
import Localizacao from "./components/localizacao/localizacao"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/paineladministrativo" exact={true} component={Paineladministrativo} />
      <Route path="/estoque" exact={true} component={Estoque} />
      <Route path="/estoque:key" component={Estoque} />
      {/* Os campos pesquisa da home ou menu direcionarão para essa url acima com a key pesquisada */}
      <Route path="/detalhesanuncio:idanuncio" component={DetalhesAnuncio} />
      <Route path="/blindados" exact={true} component={Blindados} />
      <Route path="/novos" component={Novos} />
      <Route path="/vender" component={Vender} ></Route>
      <Route path="/contato" component={Contato} ></Route>
      <Route path="/localizacao" component={Localizacao} ></Route>

      {/* <Route path="*" component={PaginaErro} /> */}

    </Switch>
  </ BrowserRouter>

  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

