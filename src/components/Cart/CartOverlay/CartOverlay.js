import React, { Component } from "react";
import CartItem from "../CartItem";
import "./CartOverlay.style.css";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import { calculateTax,filterProductPrice } from "../../helper-functions";
class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();

    this.state = {
      totalPrice: 0,
      counterUpdateTotalPrice:0

    };
  }

  handleOutsideOverlayClicked=(event)=> {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.toggleCartModal()
    }
  }
  updateTotalPrice = (price) => {

    this.setState((prevState) => ({
      
      counterUpdateTotalPrice: prevState.counterUpdateTotalPrice + price,
    }));
  };

  counterTriggeredToggler=()=>{
    this.setState(prev=>({
      counterTriggered:!prev.counterTriggered
    }))
  }
  componentDidUpdate =()=>{
    const {cartItems,currencyType}= this.props;

    var totalPrice=0;
    cartItems.map(cart=>{
      const price =filterProductPrice(cart.prices,currencyType);
      totalPrice+=price.amount;
    });
    totalPrice+=this.state.counterUpdateTotalPrice;
    
    if(this.state.totalPrice != totalPrice ){
      this.setState({totalPrice:totalPrice});
    }
  
    
  }
  componentDidMount=()=>{
    document.addEventListener("mousedown", this.handleOutsideOverlayClicked);
  }
  componentWillUnmount=()=>{
    document.removeEventListener("mousedown", this.handleOutsideOverlayClicked);
  }
  changeTotalPriceOnUpdate=()=>{
    return this.state.totalPrice;
  }


  

  render() {

    
    const {
      cartItems,
      currencyType,
      removeItemFromTheCart,
      addItemToTheCart,
      cartItemCount,
      toggleCartModal,
      makeItOverlay,
    
    } = this.props;
    const {totalPrice}=this.state;
    const overlayStyle = makeItOverlay
      ? {
          position: "fixed",
          left: 0,
          top: "5.1rem",
          bottom: 0,
          right: 0,
          overflowY: 'scroll',
          backgroundColor: "rgb(0, 0, 0, 0.5)",
          border: "1px solid",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          paddingRight: "5rem",
        }
      : {};
    const overlayContent = makeItOverlay
      ? {
          width: "20rem",
          backgroundColor: "white",
          padding: " 0.2rem",
        }
      : {
          backgroundColor: "white",

          width: "30rem",
        };
    const overlayBody = makeItOverlay?{
      padding: "10px",
      borderTop: "1px solid #eee",
      borderBottom: "1px solid #eee",
    }:{};
    const boldTextStyle={
      fontWeight:'600'
    }
    return (
      <div style={overlayStyle}  >
        <div className="cartoverlay--content" style={overlayContent} ref={this.wrapperRef}>
         
          <div className="cartoverlay--header">
            <h4 className="cartoverlay--title">
              {makeItOverlay ? (
                cartItemCount > 0 ? (
                  <p>
                    My bag :
                    <span style={{ fontWeight: "400" }}>
                      {" "}
                      {cartItemCount} {cartItemCount > 1 ? "items" : "item"}
                    </span>
                  </p>
                ) : (
                  <p>No item added to the cart yet</p>
                )
              ) : cartItemCount == 0 ? (
                <div style={{
              
                  fontWeight:'500',
                  fontSize:'20px',
                  display:'flex' ,justifyContent:'center',width:'100rem',alignItems:'center',height:'40rem'}}>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <p></p>
              )}
            </h4>
          </div>
          <div className="cartoverlay--body" style={overlayBody} >
            {cartItems.map((item) => {
              return (
                <CartItem
                  {...item}
                  currencyType={currencyType}
                  key={item.id}
                  removeItemFromTheCart={removeItemFromTheCart}
                  addItemToTheCart={addItemToTheCart}
                  updateTotalPrice={this.updateTotalPrice}
                  makeItOverlay={makeItOverlay}
                 
                />
              );
            })}
          </div>

          {makeItOverlay ? (
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
                    <Link
                      className="actions--viewbag"
                      to="cart"
                      onClick={toggleCartModal}
                    >
                      <p>VIEW BAG</p>
                    </Link>
                    <button className="actions--checkout">CHECK OUT</button>
                  </div>
                </div>
              ) : (
                <div>
                  <button className="action--close">CLOSE</button>{" "}
                </div>
              )}
            </div>
          ) : cartItemCount>0?(
            <div style={{borderTop: "1px solid #eee",width: "90rem",}}>
           
              <p>Tax 21%: <span style={boldTextStyle}>{currencyType} {calculateTax(totalPrice)}</span></p>
              <p>Quantity <span style={boldTextStyle}>{cartItemCount}</span></p>
              <p>Total: <span style={boldTextStyle}>{currencyType}{totalPrice}</span></p>
              <button className="cart--order">ORDER</button>
            </div>
          ) :<div>
            
          </div>}
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
  toggleCartModal: PropTypes.func,
  makeItOverlay: PropTypes.bool.isRequired,
  currencyType:PropTypes.string.isRequired
  
};

export default CartOverlay;
