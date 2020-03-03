import React, { Fragment, Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import ApiService from './ApiService';

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
                
                this.setState({
                    nomes : [...this.state.nomes, ...res.data]
                })
            })
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