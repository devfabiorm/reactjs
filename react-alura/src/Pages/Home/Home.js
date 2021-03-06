import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Container from '@material-ui/core/Container'

import Header from '../../Components/Header/Header'
import Tabela from '../../Components/Tabela/Tabela';
import Formulario from '../../Components/Formulario/Formulario';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      autores: [],
    }
  }
  

  removeAutor = id => {

    const { autores } = this.state;

    ApiService.RemoveAutor(id)
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

  escutadorDeSubmit = dados => {
    
    const autor = {
      nome: dados.nome,
      livro: dados.livro,
      preco: dados.preco
    }

    ApiService.CriaAutor(JSON.stringify(autor))
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
      .then(res => {
        if(res.message === 'success')
          this.setState({autores: [...this.state.autores, ...res.data]})
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar listas os cadastros'))
  }

  render() {
    
    const campos = [
                      { titulo: 'Autores', chave: 'nome' }, 
                      { titulo: 'Livros', chave: 'livro'},
                      { titulo: 'Preços', chave: 'preco'}
                    ];

    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Formulário</h1>
          <Formulario escutadorDeSubmit={this.escutadorDeSubmit} />
          <Tabela campos = {campos} dados={this.state.autores} removeDados={this.removeAutor} />
        </Container>
      </Fragment>
    );
  }

}

export default App;
