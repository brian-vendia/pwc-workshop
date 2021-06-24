import {Card,Button} from 'react-bootstrap';
import ContentLoader from 'react-content-loader';
import EditForm from '../components/EditForm';
import GetHero from '../gql/GetHero';
import GetVillian from '../gql/GetVillian';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DetailView(props:any){
    const router = useRouter()

    const { data, loading, error } = useQuery(props.class=="hero"?GetHero():GetVillian(),{variables:{id:props.oid}});    
     
    const goBack=()=>{
        router.back();
    }
    return(
        <section>
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
          {error && (
              {error}
          )}
          {data && (
              <>
           <EditForm data={data.getVillian||data.getHero} class={props.class}/>
           </>
            )}
        </section>
    )
}