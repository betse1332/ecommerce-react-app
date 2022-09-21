import React, { Component } from "react";
import Layout from "../Layout";
import { Route, Routes } from "react-router-dom";
import Category from "../Category";
import Cart from "../Cart";
import Product from "../Product";
import "./App.style.css";
class App extends Component {
  state = {
    currencyType: "$",
    categoryName: "all",
    
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
    console.log(this.state.currencyType);
    return (
      <div className="app">
        <Routes>
          <Route
            element={
              <Layout
                handleTabChange={this.handleTabChange}
                handleSelectorChange={this.handleSelectorChange}
                currencyType={this.state.currencyType}
              />
            }
          >
            <Route
              index
              element={
                <Category
                  currencyType={this.state.currencyType}
                  categoryName={this.state.categoryName}
                />
              }
            />
            <Route
              path="all"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                />
              }
            />
            <Route
              path="clothes"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
                />
              }
            />
            <Route
              path="tech"
              element={
                <Category
                  categoryName={this.state.categoryName}
                  currencyType={this.state.currencyType}
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
