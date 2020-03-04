import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class Tabela extends Component {
    render() {

        const { autores, removeAutor } = this.props;
        return (
            <Table className="centered highlight">
                <TableHead>
                    <TableRow>
                        <TableCell>Autores</TableCell>
                        <TableCell>Livros</TableCell>
                        <TableCell>Precos</TableCell>
                        <TableCell>Remover</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody autores={autores} removeAutor={removeAutor}>
                    {
                        autores.map((linha) => {

                            return (
                                <TableRow key={linha.id}>
                                    <TableCell>{linha.nome}</TableCell>
                                    <TableCell>{linha.livro}</TableCell>
                                    <TableCell>{linha.preco}</TableCell>
                                    <TableCell><Button variant="contained" color="primary" onClick={() => removeAutor(linha.id)} >Remover</Button></TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>

            </Table>
        );
    }
}

export default Tabela;