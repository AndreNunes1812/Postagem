import React, { Component } from 'react';
var divStyle = {
    background: "#eee",
    padding: "20px",
    margin: "20px"
};

class Error404 extends Component {

    render() {
        return (
            <div className="container" style={divStyle}>
                <h2>Página não encontrada</h2>              
            </div>
        );
    }
}

export default Error404;
