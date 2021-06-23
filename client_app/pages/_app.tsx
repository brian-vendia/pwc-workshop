import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";

function createApolloClient() {
  // Declare variable to store authToken
  let token;

  const httpLink = createHttpLink({
    uri: process.env.VENDIA_GRAPHQL_API,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    if (typeof window !== "undefined") {
      token = localStorage.getItem("authToken");
    }
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        "X-API-Key": process.env.VENDIA_GRAPHQL_KEY,
      },
    };
  });

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={createApolloClient()}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
