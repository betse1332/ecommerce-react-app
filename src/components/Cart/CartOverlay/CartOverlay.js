import React, { Component } from "react";
import CartItem from "../CartItem";
import "./CartOverlay.style.css";
import PropTypes from "prop-types";
class CartOverlay extends Component {
  render() {
    const {
      cartItems,
      currencyType,
      removeItemFromTheCart,
      addItemToTheCart,
      cartItemCount,
    } = this.props;

    return (
      <div className="cartmodal">
        <div className="cartmodal--content">
          <div className="cartmodal--header">
            <h4 className="cartmodal--title">
              {cartItemCount > 0 ? (
                <p>
                  My bag :
                  <span style={{ fontWeight: "400" }}>
                    {" "}
                    {cartItemCount} {cartItemCount > 1 ? "items" : "item"}
                  </span>
                </p>
              ) : (
                <p>No item added to the cart yet</p>
              )}
            </h4>
          </div>
          <div className="cartmodal--body">
            {cartItems.map((item) => (
              <CartItem
                {...item}
                currencyType={currencyType}
                key={item.id}
                removeItemFromTheCart={removeItemFromTheCart}
                addItemToTheCart={addItemToTheCart}
              />
            ))}
            <button type="">close</button>
          </div>
        </div>
      </div>
    );
  }
}

CartOverlay.prototypes = {
  cartItems: PropTypes.array.isRequired,
  removeItemFromTheCart: PropTypes.func.isRequired,
  addItemToTheCart: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number.isRequired,
};

export default CartOverlay;
