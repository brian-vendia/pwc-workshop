import gql from 'graphql-tag';

export default function GetHero() {
    return gql`
    query getHero($id: ID!) {
  getHero(id: $id ){
    description
    id
    name
    slug
    username
  }
}

    `
}