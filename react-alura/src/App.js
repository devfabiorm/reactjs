import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

import Header from './Header';
import Tabela from './Tabela';
import Formulario from './Formulario';
import PopUp from './PopUp';

class App extends Component {

  state = {
    autores: [
      {
        nome: 'Paulo',
        livro: 'React',
        preco: '1000'
      },
      {
        nome: 'Daniel',
        livro: 'Java',
        preco: '99'
      },
      {
        nome: 'Marcos',
        livro: 'Design',
        preco: '150'
      },
      {
        nome: 'Bruno',
        livro: 'DevOps',
        preco: '100'
      }
    ],
  }

  removeAutor = index => {

    const { autores } = this.state;
    this.setState({
      autores: autores.filter((autor, posAtual) => {
        return posAtual !== index;
      }),
    })
    PopUp.exibeMensagem('success', 'Autor excluído com sucesso');
  }

  escutadorDeSubmit = autor => {

    this.setState({
      autores: [...this.state.autores, autor]
    });

    PopUp.exibeMensagem('success', 'Autor cadastrado com sucesso')
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
