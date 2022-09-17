import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";



const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,


})
console.log(process.env.REACT_APP_GRAPHQL_API_ENDPOINT)

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({

    link: httpLink,

    cache

})

export default apolloClient;