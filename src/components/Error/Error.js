import React, { Component } from "react";


class ErrorMessage extends Component {

    render() {
        const { errorMessage } = this.props

        return (

            <div className="app--error">
                <p>{errorMessage}</p>
            </div>
        )
    }
}

export default ErrorMessage