import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS_FROM_CATEGORY = gql`
  query ($categoryName: String!) {
    category(input: {title: $categoryName}) {
      products {
        id
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        
        gallery
        name
      }
    }
  }
`;
