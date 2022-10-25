import React, { Component } from "react";
import CartOverlay from "./CartOverlay";
import './cart.style.css'
import { filterProductPrice } from "../helper-functions";
class Cart extends Component {

  constructor(props){

    super(props);
  }


  
  render() {
    const {
      cartItemCount,
      cartItems,
     
      currencyType,
      removeItemFromTheCart,
      addItemToTheCart,
    } = this.props;
    return (
      <div className="cart">
        <h2 style={{ fontWeight: "600",padding:'0rem .6rem ' }}>CART</h2>
        <CartOverlay
            className='cart--cartoverlay'
          cartItems={cartItems}
          currencyType={currencyType}
          removeItemFromTheCart={removeItemFromTheCart}
          addItemToTheCart={addItemToTheCart}
          cartItemCount={cartItemCount}
          
        />
      </div>
    );
  }
}

export default Cart;
