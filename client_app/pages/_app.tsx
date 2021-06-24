import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SiteLayout from "../components/SiteLayout";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { DropdownButton,Dropdown } from 'react-bootstrap';

const shareEnv = require('../share_env.json');

function createApolloClient(node: any) {
  // Declare variable to store authToken
  let token;

  const httpLink = createHttpLink({
    uri: node.gqlAPI,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "X-API-Key": node.gqlKey,
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
  const [node, setNode] = useState(shareEnv.nodes[0]);

  return (
    <div>
      <ApolloProvider client={createApolloClient(node)}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </ApolloProvider>
      <div className="z-50 absolute bottom-0 w-full bg-gray-100 border-top border-gray-500 p-1 block text-sm">
        <span className="float-right mx-1 text-sm w-full md:w-auto md:max-w-3xl" >
          <DropdownButton title={`Uni Node (${node.name}) `} drop="up" variant="secondary">
            {shareEnv.nodes.map((node:any)=>{
              return (
                <Dropdown.Item onSelect={()=>{setNode(node)}}>{`${node.name} | ${node.region}`}</Dropdown.Item>
              )
            })}
          </DropdownButton></span>
      </div>
    </div>
  );
}
export default MyApp;
