import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './index.css';
import App from './App';
import Paineladministrativo from "./components/painelAdministrativo/painelAdministrativo"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/paineladministrativo" exact={true} component={Paineladministrativo} />
      {/* <Route path="/biblianvi/painelleitura/:idade/:livro/:capitulo/:versiculo" component={PainelLeitura} />recebe 3 parametros */}
      {/* <Route path="/harpacrista" component={HinoHarpa} /> */}
      {/* <Route path="/populaharpa" component={PopularBDHarpa} /> */}
      {/* <Route path="/biblianvi/pesquisa/:palavrapesquisabiblia" component={PesquisaBiblia} /> */}
      {/* <Route path="/sobre" component={Sobre} ></Route> */}
      {/* <Route path="*" component={PaginaErro} /> */}

    </Switch>
  </ BrowserRouter>

  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

