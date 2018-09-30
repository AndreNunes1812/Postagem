import React, { Component } from 'react';
import {
    Button,
    Jumbotron
} from 'react-bootstrap';

var divStyle = {
    background: "#eee",
    padding: "20px",
    margin: "20px"
};

class Error404 extends Component {

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Jumbotron style={divStyle}>

                    <h2><strong> Pagina não encontrada</strong> </h2>
                    <p><strong> Atenção, favor validar alguns pontos:</strong></p>
                    <p>    1) Verifique se sua conexão de internet está disponivel</p>
                    <p>    2) Talvez seu link não está disponivel</p>
                    <p>
                        <Button bsStyle="primary" type="button" onClick={() => this.props.history.push(`/`)}>Inicio</Button>
                    </p>

                </Jumbotron>;
            </div>
        );
    }
}

export default Error404