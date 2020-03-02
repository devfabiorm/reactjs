import React, { Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import App from './App';

const Livros = () => {

    let livros = new App().state.autores;

    return (

        <Fragment>
            <Header />
            <div className="container">
                <h1>Livros</h1>
                <ul className="collection">
                    {livros.map((livro, index) => {
                        return(<li key={index} className="collection-item">{livro.livro}</li>);
                    })}
                </ul>
            </div>
        </Fragment>
    );
}
export default Livros;