import React, { Fragment, Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import Tabela from '../../Components/Tabela/Tabela';
import Header from '../../Components/Header/Header';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';

class Autores extends Component {

    constructor(props){
        super(props);

        this.state = {
            nomes: [],
        }
    }

    componentDidMount(){

        ApiService.ListaAutores()
            .then(res => {
                if(res.message === 'success')
                    this.setState({
                        nomes : [...this.state.nomes, ...res.data]
                    })
            })
            .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao tentar recuperar autores'))
    }

    render(){

        const campos = [{titulo: 'Autores', chave: 'nome'}];

        return (
            <Fragment>
                <Header />
                <div className="container">
                    <h1>Página de Autores</h1>
                    <Tabela campos={campos} dados={this.state.nomes} />
                </div>
            </Fragment>
        );
    }

}
export default Autores;