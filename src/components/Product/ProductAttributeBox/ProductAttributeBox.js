import React, { Component } from "react";

import PropTypes from "prop-types";
import "./ProductAttributeBox.style.css";
class ProductAttributeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  componentDidMount = () => {
    const { isSelected } = this.props;

    // console.log()
    this.setState({
      isSelected: isSelected,
    });
  };
  handleOnAttributeClicked = () => {
    const {  incrementItem, decrementItem } = this.props;
   
    this.setState(
      (prevstate) => ({
        isSelected: !prevstate.isSelected,
      }),
      () => (this.state.isSelected ? incrementItem() : decrementItem())
    );
  };

  render() {
    const style = {
      backgroundColor: "black",
      color: "white",
    };
    const { attribute } = this.props;
    const { isSelected } = this.state;
    console.log(
      "🚀 ~ file: ProductAttributeBox.js ~ line 8 ~ ProductAttributeBox ~ render ~ attribute",
      attribute
    );

    return (
      <div
        className="product--attribute"
        style={isSelected ? style : {}}
        onClick={this.handleOnAttributeClicked}
      >
        <p className="attribute--component">{attribute}</p>
      </div>
    );
  }
}

ProductAttributeBox.prototypes = {
  productSize: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,

  incrementItem: PropTypes.func.isRequired,
  decrementItem: PropTypes.func.isRequired,
};

export default ProductAttributeBox;
