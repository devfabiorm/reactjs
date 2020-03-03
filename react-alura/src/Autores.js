import React, { Fragment, Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import ApiService from './ApiService';
import PopUp from './PopUp';

class Autores extends Component {

    constructor(props){
        super(props);

        this.state = {
            nomes: [],
        }
    }

    componentDidMount(){

        ApiService.ListaAutores()
            .then(res => ApiService.TrataErros(res))
            .then(res => {
                if(res.message === 'success')
                    this.setState({
                        nomes : [...this.state.nomes, ...res.data]
                    })
            })
            .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao tentar recuperar autores'))
    }

    render(){
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <h1>Autores</h1>
                    <ul className="collection">
                        {this.state.nomes.map((autor) => {
                            return(<li className="collection-item" key={autor.id}>{autor.nome}</li>)
                        })}
                    </ul>
                </div>
            </Fragment>
        );
    }

}
export default Autores;