import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrowDown, arrowUp, emptyCart } from "../../../assets";
import "./LayoutActions.style.css";
import CartOverlay from "../../Cart/CartOverlay";
import { filterProductPrice } from "../../helper-functions";
class LayoutActions extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      isDropDownOpen: false,
      headerTitle: this.props.title,
      selectedItem: {},
      isCartModalOpened: false,
      cartItemPrices: 0,
    };
  }

  // updateTotalPrice = (priceUpdate) => {
  //   const { currencyType } = this.props;
  //   const { productPrices, actionType } = priceUpdate;
  //   const price = filterProductPrice(productPrices, currencyType);
  //   this.setState((prevState) => ({
  //     totalPrice:
  //       actionType === "INCREMENT"
  //         ? prevState.totalPrice + price
  //         : prevState.totalPrice - price,
  //   }));

  //   console.log(
  //     "🚀 ~ file: LayoutActions.js ~ line 25 ~ LayoutActions ~ this.setState ~ totalPrice",
  //     this.state.totalPrice
  //   );
  // };
  handleOutsideDropdownClicked=(event)=> {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.toggleDropDown()
    }
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
      () => {
        selectedItem?.symbol !== item.symbol && handleSelector(item.symbol);
      
       
      }
    );
  };
  componentDidMount=()=>{
    document.addEventListener("mousedown", this.handleOutsideDropdownClicked);
  }
  componentWillUnmount=()=>{
    document.removeEventListener("mousedown", this.handleOutsideDropdownClicked);
  }

  
  render() {
    const {
      currencies,
      cartItems,
      currencyType,
      cartItemCount,
      removeItemFromTheCart,
      addItemToTheCart,
      totalPrice,
    } = this.props;
    console.log(
      "🚀 ~ file: LayoutActions.js ~ line 43 ~ LayoutActions ~ render ~ cartItems",
      cartItems
    );

    const { isDropDownOpen, headerTitle, isCartModalOpened, cartItemPrices } =
      this.state;
    return (
      <div className="layout--actions">
        <div className="action--items">
          <div className="currency--dropdown" ref={this.wrapperRef}> 
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
            toggleCartModal={this.toggleCartModal}
         
            makeItOverlay={true}
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
  addItemToTheCart: PropTypes.func.isRequired,
};
export default LayoutActions;
