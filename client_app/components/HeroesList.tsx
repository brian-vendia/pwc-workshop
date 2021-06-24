import { useQuery, gql, useMutation } from "@apollo/client";
import listHerosQuery from '../gql/ListHeroes';
import removeHeroQuery from '../gql/RemoveHero';
import {useRouter} from 'next/router'
import Link from 'next/link';

import ContentLoader from 'react-content-loader'
import React, { useState } from "react";
import Hero from './HeroCard';
import { Toast,Button } from "react-bootstrap";
import {
  ViewGridAddIcon

} from '@heroicons/react/outline';
export default function HeroList(props: any) {
  const router = useRouter()

  const { data, loading, error, refetch } = useQuery(listHerosQuery(),{
    pollInterval: 2000,
  });
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [removeHero, { error: removeHeroError,data:removeHeroData }] = useMutation(removeHeroQuery());

  const handleDelete = (id: string) => {
    removeHero({ variables: { id } });
    if (removeHeroError) {
      setErrorMsg(removeHeroError.message);
      setShowError(true);
    }
    else if(removeHeroData){
      setErrorMsg(removeHeroData);
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
        <span className="px-10 font-extrabold text-green-800 text-4xl">HEROES<Link href={`${router.pathname}/new`}><Button className="h-12 w-12 mx-3 my-3" variant="secondary"><ViewGridAddIcon /></Button></Link>
</span>
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
          {data && data.listHeros.Heros.map((hero: any) => {
            return (
              <li key="hero.id"><Hero data={hero} onDelete={handleDelete} /></li>
            )
          })}

        </ul>
        <Toast
        show={showError}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            {errorMsg}
            </Toast.Body>
        </Toast>
      </section>
    )
}