import { useQuery, gql, useMutation } from "@apollo/client";
import listVilliansQuery from "../gql/ListVillians";
import ContentLoader from 'react-content-loader'
import React, { useState } from "react";
import Villian from './HeroCard';
import {useRouter} from 'next/router'

import RemoveVillianQuery from "../gql/RemoveVillian";
import {
  ViewGridAddIcon

} from '@heroicons/react/outline';
import { Button } from "react-bootstrap";

export default function VilliansList(props: any) {
  const router = useRouter()

  const { data, loading, error,refetch } = useQuery(listVilliansQuery(),{
    pollInterval:2000
  });

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [RemoveVillian, { error: RemoveVillianError,data:RemoveVillianData }] = useMutation(RemoveVillianQuery());

  const handleDelete = (id: string) => {
    RemoveVillian({ variables: { id } });
    if (RemoveVillianError) {
      setErrorMsg(RemoveVillianError.message);
      setShowError(true);
    }
    else if(RemoveVillianData){
      setErrorMsg(RemoveVillianData);
      setShowError(true);
    }
    refetch();
  }
 
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
      <span className="px-10 font-extrabold text-green-800 text-4xl">VILLIANS<a href={`${router.pathname}/new`}><Button className="h-12 w-12 mx-3 my-3" variant="secondary"><ViewGridAddIcon /></Button></a>
</span>        <ul role="presentation">
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
              <li><Villian data={villian} onDelete={handleDelete}/></li>
            )
          })}

        </ul>

      </section>
    )
}