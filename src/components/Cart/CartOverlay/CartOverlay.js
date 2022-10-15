import React, { Component } from "react";
import CartItem from "../CartItem";
import "./CartOverlay.style.css";
import PropTypes from "prop-types";
import { Link, Outlet} from "react-router-dom";
class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
    };
  }

  updateTotalPrice = (price) => {
    this.setState((prevState) => ({
      totalPrice: prevState.totalPrice + price,
    }));
  };

  render() {
    const {
      cartItems,
      currencyType,
      removeItemFromTheCart,
      addItemToTheCart,
      cartItemCount,

      
    } = this.props;

    return (
      <div className="cartoverlay">
        <div className="cartoverlay--content">
          <div className="cartoverlay--header">
            <h4 className="cartoverlay--title">
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
          <div className="cartoverlay--body">
            {cartItems.map((item) => {
              
              return (
                <CartItem
                  {...item}
                  currencyType={currencyType}
                  key={item.id}
                  removeItemFromTheCart={removeItemFromTheCart}
                  addItemToTheCart={addItemToTheCart}
                  updateTotalPrice={this.updateTotalPrice}
                />
              );
            })}
          </div>

          <div className="cartoverlay--footer">
            {cartItemCount > 0 ? (
              <div>
                <div className="cart--totalprice">
                  <h4>Total</h4>
                  <h4>
                    {currencyType}
                    {this.state.totalPrice}
                  </h4>
                </div>
                <div className="footer--actions">
                  <Link className="actions--viewbag" to="cart"><p>VIEW BAG</p></Link>
                  <button className="actions--checkout">CHECK OUT</button>
                </div>
              </div>
            ) : (
              <div>
                <button className="action--close">CLOSE</button>{" "}
              </div>
            )}
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
