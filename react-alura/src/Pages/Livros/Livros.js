import React, { Fragment, Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import Header from '../../Components/Header/Header'
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';

class Livros extends Component{

    constructor(props){
        super(props);

        this.state = {
            livros: []
        }
    }

    componentDidMount(){

        ApiService.ListaLivros()
            .then(res => {
                if(res.message === 'success')
                    this.setState({
                        livros: [...this.state.livros, ...res.data]
                    })
            })
            .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar recuperar os livros'))
    }

    render(){
        return (

            <Fragment>
                <Header />
                <div className="container">
                    <h1>Livros</h1>
                    <ul className="collection">
                        {this.state.livros.map((livro) => {
                            return(<li key={livro.id} className="collection-item">{livro.livro}</li>);
                        })}
                    </ul>
                </div>
            </Fragment>
        );
    }

}
export default Livros;