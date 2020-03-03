import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import Header from './Header';
import Tabela from './Tabela';
import Formulario from './Formulario';
import PopUp from './PopUp';
import ApiService from './ApiService';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      autores: []
    }
  }
  

  removeAutor = id => {

    const { autores } = this.state;

    ApiService.RemoveAutor(id)
      .then(res => {
        this.setState({
          autores: autores.filter((autor) => {
            return autor.id !== id;
          }),
        });
        
        PopUp.exibeMensagem('success', 'Autor excluído com sucesso');
      })
  }

  escutadorDeSubmit = autor => {

    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        this.setState({
          autores: [...this.state.autores, autor]
        });

        PopUp.exibeMensagem('success', 'Autor cadastrado com sucesso');
      })
  }

  componentDidMount(){

    ApiService.ListaAutores()
      .then(res => {
        this.setState({autores: [...this.state.autores, ...res.data]})
      })
  }

  render() {
      
    return (
      <Fragment>
        <Header />
        <div className="container">
          <h1>Formulário</h1>
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Formulario escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }

}

export default App;
