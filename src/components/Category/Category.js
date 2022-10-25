import React, { Component } from "react";
import { Query } from "react-apollo";
import ErrorMessage from "../Error";
import Product from "../Product";
import ProgressIndicator from "../ProgressIndicator";
import { GET_PRODUCTS_FROM_CATEGORY } from "./queries";
import "./Category.style.css";
import { filterProductPrice } from "../helper-functions";
import { Link } from "react-router-dom";

class Category extends Component {
  render() {
    const { categoryName, currencyType, handleAddItemToCart } = this.props;

    return (
      <div className="category">
        <h1 className="category--name">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}{" "}
          Category
        </h1>
        <Query query={GET_PRODUCTS_FROM_CATEGORY} variables={{ categoryName }}>
          {({ data, loading, error }) => {
            if (loading) {
              return <ProgressIndicator />;
            }
            if (error) {
              return <ErrorMessage errorMessage={error.messag} />;
            }

            const { products } = data.category;
            console.log(products);
            return (
              <div className="category--products">
                {products.map((product) => {
                  return (
                 
                      <Product
                        key={product.id}
                        productID={product.id}
                        coverImage={product.gallery[0]}
                        productName={product.name}
                        handleAddItemToCart={handleAddItemToCart}
                        productPrice={filterProductPrice(
                          product.prices,
                          currencyType
                        )}
                      />
                   
                  );
                })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Category;
