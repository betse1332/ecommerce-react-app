import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrowDown, arrowUp, emptyCart } from "../../../assets";
import "./LayoutActions.style.css";
import CartOverlay from "../../Cart/CartOverlay";
class LayoutActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropDownOpen: false,
      headerTitle: this.props.title,
      selectedItem: {},
      isCartModalOpened: false,
    };
  }
  toggleCartModal = () => {
    this.setState((prevstate) => ({
      isCartModalOpened: !prevstate.isCartModalOpened,
    }));
  };

  toggleDropDown = () => {
    this.setState((prevState) => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }));
  };
  selectCurrency = (item) => {
    const { selectedItem } = this.state;
    const { handleSelector } = this.props;
    this.setState(
      {
        isDropDownOpen: false,
        selectedItem: item,
        headerTitle: item.symbol,
      },
      () => selectedItem?.symbol !== item.symbol && handleSelector(item.symbol)
    );
  };

  render() {
    const {
      currencies,
      cartItems,
      currencyType,
      cartItemCount,
      removeItemFromTheCart,
      addItemToTheCart,
    } = this.props;
    console.log(
      "🚀 ~ file: LayoutActions.js ~ line 43 ~ LayoutActions ~ render ~ cartItems",
      cartItems
    );

    const { isDropDownOpen, headerTitle, isCartModalOpened } = this.state;
    return (
      <div className="layout--actions">
        <div className="action--items">
          <div className="currency--dropdown">
            <button className="dropdown--header" onClick={this.toggleDropDown}>
              <div
                className="header--title"
                style={{
                  marginRight: isDropDownOpen ? 0 : "1.23rem",
                }}
              >
                <span>
                  {" "}
                  {headerTitle}{" "}
                  <img
                    src={isDropDownOpen ? arrowUp : arrowDown}
                    alt="arrow-up"
                    className="dropdown--arrowup"
                  />
                </span>
              </div>
            </button>
            {isDropDownOpen && (
              <div role="list" className="dropdown--list">
                {currencies.map((currency) => (
                  <button
                    key={currency.symbol}
                    className="dropdown--listitem"
                    onClick={() => this.selectCurrency(currency)}
                  >
                    {currency.symbol} {currency.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="cart--base" onClick={this.toggleCartModal}>
            {cartItemCount > 0 && (
              <div className="cart--indicator">
                <div className="notification--count">{cartItemCount}</div>
              </div>
            )}
          </div>
        </div>
        {isCartModalOpened && (
          <CartOverlay
            cartItems={cartItems}
            currencyType={currencyType}
            removeItemFromTheCart={removeItemFromTheCart}
            addItemToTheCart={addItemToTheCart}
            cartItemCount={cartItemCount}
            
          />
        )}
      </div>
    );
  }
}
LayoutActions.prototypes = {
  title: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  handleSelector: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  cartItemCount: PropTypes.number.isRequired,
  removeItemFromTheCart: PropTypes.func.isRequired,
  addItemToTheCart:PropTypes.func.isRequired
};
export default LayoutActions;
