import gql from "graphql-tag";

export const GET_PRODUCT_BY_ID = gql`
  query ($productID: String!) {
    product(id: $productID) {
      id
      gallery
      brand
      name
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name

        type
        items {
          displayValue
          id
          value
        }
      }
    }
  }
`;
