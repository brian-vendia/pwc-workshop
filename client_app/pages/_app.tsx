import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
const shareEnv=require('../share_env.json');

function createApolloClient() {
  // Declare variable to store authToken
  let token;

  const httpLink = createHttpLink({
    uri: shareEnv.gqlAPI,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "X-API-Key":shareEnv.gqlKey,
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

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
