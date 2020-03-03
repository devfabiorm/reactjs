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
      .then(res => ApiService.TrataErros(res))
      .then(res => {
        if(res.message === 'deleted'){
          this.setState({
            autores: autores.filter((autor) => {
              return autor.id !== id;
            }),
          });
          PopUp.exibeMensagem('success', 'Autor excluído com sucesso');
        }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar excluir autor'))
  }

  escutadorDeSubmit = autor => {

    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => ApiService.TrataErros(res))
      .then(res => {
        if(res.message === 'success'){
          this.setState({
            autores: [...this.state.autores, autor]
          });
          PopUp.exibeMensagem('success', 'Autor cadastrado com sucesso');
        }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar cadastrar autor'))
  }

  componentDidMount(){

    ApiService.ListaAutores()
      .then(res => ApiService.TrataErros(res))
      .then(res => {
        if(res.message === 'success')
          this.setState({autores: [...this.state.autores, ...res.data]})
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar listas os cadastros'))
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
