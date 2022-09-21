import gql from "graphql-tag";

export const GET_CATEGORYNAME_AND_CURRENCY = gql`
  {
    categories {
      name
    }
    currencies {
      symbol
      label
    }
  }
`;
