import React, { Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './Header';
import App from './App';

const Autores = () => {

    let autores = new App().state.autores;
    
    return (
        <Fragment>
            <Header />
            <div className="container">
                <h1>Autores</h1>
                <ul className="collection">
                    {autores.map((autor, index) => {
                        return(<li className="collection-item" key={index}>{autor.nome}</li>)
                    })}
                </ul>
            </div>
        </Fragment>
    );
}
export default Autores;