import React, { Component } from "react";
import './CartOverlay.style.css'
class CartOverlay extends Component {
  render() {
    return (
      <div className="cartmodal">
        <div className="cartmodal--content">
          <div className="cartmodal--header">
            <h4 className="cartmodal--title">My bag 3</h4>
          </div>
          <div className="cartmodal--body">body here</div>
          <div className="cartmodal--footer">
            <button type="">close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
