import React, { Component } from "react";
import { logoTransparent, minus } from "../../../assets";
import { filterProductPrice } from "../../helper-functions";
import ProductAttributeBox from "../../Product/ProductAttributeBox";
import ProductColorBox from "../../Product/ProductColorBox";

import "./CartItem.style.css";
class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemCounter: 1,
      selectedColor: "",
    };
  }
  componentDidMount = () => {
    const { prices, updateTotalPrice, currencyType } = this.props;

    const price = filterProductPrice(prices, currencyType);

    updateTotalPrice(price.amount);
  };
 
  incrementItem = () => {
    const { addItemToTheCart, id, prices, currencyType, updateTotalPrice } =
      this.props;

    const price = filterProductPrice(prices, currencyType);

    this.setState(
      (prevState) => ({
        itemCounter: prevState.itemCounter + 1,
      }),
      () => {
        addItemToTheCart({ id: id });
        updateTotalPrice(price.amount);
      }
    );
  };

  decrementItem = () => {
    const {
      removeItemFromTheCart,
      id,
      prices,
      currencyType,
      updateTotalPrice,
    } = this.props;
    const price = filterProductPrice(prices, currencyType);
    this.setState(
      (prevState) => ({
        itemCounter: prevState.itemCounter > 0 ? prevState.itemCounter - 1 : 0,
      }),
      () => {
        removeItemFromTheCart({ counter: this.state.itemCounter, id: id });
        updateTotalPrice(-price.amount);
      }
    );

    // removeItemFromTheCart({ counter: this.state.itemCounter, id: id });
  };

  render() {
    const { itemCounter } = this.state;
    const {
      brand,
      name,
      prices,
      gallery,
      attributes,
      currencyType,
      makeItOverlay,
    } = this.props;
    const price = filterProductPrice(prices, currencyType);
    const cartInlineStyle = !makeItOverlay
      ? {
          width: "90rem",
          height: "15rem",
      
          paddingTop:'1rem',
         borderTop: "1px solid #eee",

         

          
          // justifyContent: "flex-end",
        }
      : {};
    const flexStyle = makeItOverlay
      ? { flex: 3 }
      : {
          // flex:0
        };
    const counterInlineStyle = makeItOverlay
      ? {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight:'.5rem',
          alignItems: "center",
          flex: 1.5,

          fontFamily: "Railway",
          fontSize: "12px",
        }
      : {
        display:'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems:'center',
        paddingRight:'1rem',
      };
    return (
      <div className="cartitem" style={cartInlineStyle}>
        <div className="cartitem--details" style={flexStyle}>
          <p className="cartitem--name">
            {name} {brand}
          </p>
          <p className="cartitem--price">
            {price.currency.symbol} {price.amount}
          </p>

          {attributes.map((attribute) => {
            console.log(
              "🚀 ~ file: CartItem.js ~ line 96 ~ CartItem ~ {attributes.map ~ attribute",
              attribute.id !== "Color"
            );

            {
              return attribute.id !== "Color" ? (
                <div className="cartitem--size" key={attribute.id}>
                  <p className="title">{attribute.name} :</p>
                  <div className="cartitem--sizelist">
                    {attribute.items.map((item) => {
                      if (attribute.items.indexOf(item) == 0)
                        return (
                          <ProductAttributeBox
                            attribute={item.value}
                            key={item.id}
                            isSelected={true}
                            incrementItem={this.incrementItem}
                            decrementItem={this.decrementItem}
                            isDetail={false}
                          />
                        );
                      return (
                        <ProductAttributeBox
                          attribute={item.value}
                          key={item.id}
                          isSelected={false}
                          incrementItem={this.incrementItem}
                          decrementItem={this.decrementItem}
                          isDetail={false}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="cartitem--color" key={attribute.id}>
                  <p className="title">{attribute.name}:</p>
                  <div className="cartitem--colorlist">
                    {attribute.items.map((item) => {
                      if (attribute.items.indexOf(item) == 0)
                        return (
                          <ProductColorBox
                            colorCode={item.value}
                            key={item.id}
                            isSelected={true}
                            isDetail={false}
                            incrementItem={this.incrementItem}
                            decrementItem={this.decrementItem}
                          />
                        );
                      return (
                        <ProductColorBox
                          colorCode={item.value}
                          key={item.id}
                          isDetail={false}
                          isSelected={false}
                          incrementItem={this.incrementItem}
                          decrementItem={this.decrementItem}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
          }
          )}
        </div>
        <div
          style={
            makeItOverlay
              ? {
                  
                  display: "flex",
                  justifyContent: "flex-end",
                  flex: "3",
                }
              : {
                
                  display: "flex",
                  justifyContent: "flex-end",
                }
          }
        >
          <div style={counterInlineStyle}>
            <div className="counter--sign" onClick={this.incrementItem}>
              +
            </div>
            <p className="item--counter">{itemCounter}</p>
            <div className="counter--sign" onClick={this.decrementItem}>
              <img src={minus} alt="" className="minus--icon" />
            </div>
          </div>

          <div style={makeItOverlay ? { flexStyle } : { width: "30%" }}>
            <img src={gallery[0]} alt="cart item" className="cart--img" />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
