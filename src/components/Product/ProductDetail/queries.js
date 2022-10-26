import gql from "graphql-tag";

export const GET_PRODUCT_DETAIL_BY_ID = gql`
  query ($productID: String!) {
    product(id: $productID) {
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
      brand
      description
      gallery
      id
      name
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;
