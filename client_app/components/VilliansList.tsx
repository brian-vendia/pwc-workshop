import { useQuery, gql } from "@apollo/client";
import listVilliansQuery from "../gql/ListVillians";
import ContentLoader from 'react-content-loader'
import React from "react";
import Villian from './HeroCard';

export default function VilliansList(props: any) {
  const { data, loading, error } = useQuery(listVilliansQuery());

 
  if (error) {
    return (
      <section id="heroList">
        {error}
      </section>
    )
  }
  else
    return (
      <section id="heroList">
        <span className="px-10 font-extrabold text-green-800 text-4xl">VILLIANS</span>
        <ul role="presentation">
          {loading && (
            <ContentLoader
            speed={1}
            width={700}
            height={280}
            viewBox="0 0 700 280"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="8" y="3" rx="0" ry="0" width="585" height="222" />
            <rect x="11" y="236" rx="0" ry="0" width="279" height="80" />
            <rect x="315" y="237" rx="0" ry="0" width="279" height="82" />
          </ContentLoader>
          )}
          {data && data.listVillians.Villians.map((villian: any) => {
            return (
              <li><Villian data={villian}/></li>
            )
          })}

        </ul>

      </section>
    )
}