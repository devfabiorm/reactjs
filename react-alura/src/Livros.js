import React, { Fragment, Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import ApiService from './ApiService';

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

                this.setState({
                    livros: [...this.state.livros, ...res.data]
                })
            })
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