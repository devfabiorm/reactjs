import React, { Component } from 'react';
import FormValidator from './FormValidator';

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.validador = new FormValidator({
            campo: 'nome',
            metodo: 'isEmpty'
        });

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: ''
        }

        this.state = this.stateInicial;
    }

    escutadorDeInput = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

    }

    escutadorDeSubmit = () => {

        if(this.validador.valida(this.state)){
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        }else{
            console.log('Submit bloqueado');
        }  
    }

    render() {

        const { nome, livro, preco } = this.state;
        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label className="input-field active" htmlFor="nome">Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.escutadorDeInput}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label className="input-field active" htmlFor="livro">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.escutadorDeInput}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label className="input-field active" htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.escutadorDeInput}
                        />
                    </div>
                </div>

                <button className="waves-effect waves-light indigo lighten-2 btn" onClick={this.escutadorDeSubmit} type="button">Salvar
                </button>
            </form>
        );
    }
}

export default Formulario;