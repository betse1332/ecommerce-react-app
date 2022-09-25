import React, { Component } from "react";

import PropTypes from "prop-types";
class ProductColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  componentDidMount = () => {
    const { isSelected } = this.props;

    this.setState({
      isSelected: isSelected,
    });
  };
  handleColorSelector = () => {
    const { incrementItem, decrementItem } = this.props;
    this.setState(
      (prevState) => ({
        isSelected: !prevState.isSelected,
      }),
      () => (this.state.isSelected ? incrementItem() : decrementItem())
    );
  };
  render() {
    const { colorCode } = this.props;
    const { isSelected } = this.state;
    const style = {
      backgroundColor: colorCode,
      width: "1.7rem",
      height: "1.5rem",
      border: isSelected ? "3px solid #5ECE7B" : "none",
    };

    return (
      <div
        style={style}
        className="product--colorbox"
        onClick={this.handleColorSelector}
      ></div>
    );
  }
}

ProductColorBox.prototypes = {
  colorCode: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  incrementItem: PropTypes.func.isRequired,
  decrementItem: PropTypes.func.isRequired,
};
export default ProductColorBox;
