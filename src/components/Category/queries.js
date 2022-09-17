import gql from "graphql-tag";

export const GET_CATEGORIES=gql`
{
    categories {
      name
    }
  }

`