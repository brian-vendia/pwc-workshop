import {Card,Button} from 'react-bootstrap';
import ContentLoader from 'react-content-loader';
import EditForm from '../components/EditForm';
import GetHero from '../gql/GetHero';
import GetVillian from '../gql/GetVillian';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewView(props:any){
    const router = useRouter()

     
    const goBack=()=>{
        router.back();
    }
    return(
        <section>    
           <EditForm data={{name:'',description:'',slug:'',username:''}} class={props.class}/>
        </section>
    )
}