import React, { Component } from "react";
import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
import Category from "../Category";

import "./App.style.css";
class App extends Component {
  state = {
    currencyType: "$",
    categoryName: "all",
    cartItems: [],
    cartItemCount: 0,
  };

  addItemToTheCart = (product) => {
    const itemExist = this.state.cartItems.filter(
      (item) => product.id === item.id
    ).length;

    itemExist
      ? this.setState((prevState) => ({
          cartItemCount: prevState.cartItemCount + 1,
        }))
      : this.setState((prevstate) => ({
          cartItemCount: prevstate.cartItemCount + 1,
          cartItems: [...prevstate.cartItems, product],
        }));
  };

  removeItemFromTheCart = (product) => {
    const { cartItems } = this.state;

    const { counter, id } = product;
    const newCartItems = cartItems.filter((item) => item.id !== id);
    console.log("🚀 ~ file: App.js ~ line 35 ~ App ~ length", counter);
    counter == 0
      ? this.setState((prevState) => ({
          cartItems: newCartItems,
          cartItemCount: prevState.cartItemCount - 1,
        }))
      : this.setState((prevState) => ({
          cartItemCount: prevState.cartItemCount - 1,
        }));

    console.log(this.state.cartItems.length);
  };
  handleTabChange = (categoryName) => {
    this.setState({
      categoryName: categoryName,
    });
  };
  handleSelectorChange = (currency) => {
    console.log("🚀 ~ file: App.js ~ line 22 ~ App ~ currency", currency);

    this.setState({
      currencyType: currency,
    });
  };

  render() {
    const { cartItems, currencyType, cartItemCount } = this.state;
    console.log(
      "🚀 ~ file: App.js ~ line 38 ~ App ~ render ~ cartItems",
      cartItems
    );

    return (
      <div className="app">
        <Routes>
          <Route
            element={
              <Layout
                handleTabChange={this.handleTabChange}
                handleSelectorChange={this.handleSelectorChange}
                currencyType={currencyType}
                cartItems={cartItems}
                cartItemCount={cartItemCount}
                removeItemFromTheCart={this.removeItemFromTheCart}
                addItemToTheCart={this.addItemToTheCart}
              />
            }
          >
            <Route
              index
              element={
                <Category
                  currencyType={this.state.currencyType}
                  categoryName={this.state.categoryName}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
            <Route
              path="all"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
            <Route
              path="clothes"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
            <Route
              path="tech"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                  handleAddItemToCart={this.addItemToTheCart}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
