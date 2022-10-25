import React, { Component } from "react";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../queries";
import ProgressIndicator from "../../ProgressIndicator";
import ErrorMessage from "../../Error";
import "./ProductDetails.style.css";
import ProductAttributeBox from "../ProductAttributeBox";
import ProductColorBox from "../ProductColorBox";
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const productID = this.props.params.productID;
    const { removeItemFromTheCart,addItemToTheCart}=this.props;
    return (
      <div>
        <Query query={GET_PRODUCT_BY_ID} variables={{ productID }}>
          {({ data, loading, error }) => {
            if (loading) {
              return <ProgressIndicator />;
            }
            if (error) {
              return <ErrorMessage errorMessage={error.messag} />;
            }
            const { product } = data;
            const { gallery } = product;
            const {attributes}=product;
            console.log(
              "🚀 ~ file: ProductDetail.js ~ line 31 ~ ProductDetail ~ render ~ product",
              product.id
            );
            return (
              <div className="product--detail">
                <div className="product--gallery">
                  {gallery
                    .filter((item) => gallery[0] != item)
                    .map((img) => {
                      return (
                        <img src={img} key={img} className="gallery--image" />
                      );
                    })}
                </div>
                <div className="product--image">
                  <img
                    src={gallery[0]}
                    alt="product image"
                    className="cover--image"
                  />
                </div>

                <div className="productdetail--description">
                  <h3 className="productdetail--name">{product.name}</h3>
                  <p className="productdetail--brand">{product.brand}</p>

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
                                    incrementItem={()=>{}}
                                    decrementItem={()=>{}}
                                    isDetail={true}
                                  />
                                );
                              return (
                                <ProductAttributeBox
                                  attribute={item.value}
                                  key={item.id}
                                  isSelected={false}
                                  incrementItem={()=>{}}
                                  decrementItem={()=>{}}
                                  isDetail={true}
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
                                    id={item.id}
                                    isSelected={true}
                                    isDetail={true}
                                    key={item.id}
                                    incrementItem={()=>{}}
                                    decrementItem={()=>{}}
                                  />
                                );
                              return (
                                <ProductColorBox
                                  colorCode={item.value}
                                  id={item.id}
                                  key={item.id}
                                  isDetail={true}
                                  isSelected={false}
                                  incrementItem={()=>{}}
                                  decrementItem={()=>{}}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withParams(ProductDetail);
