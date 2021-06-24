import gql from 'graphql-tag';

export default function ListHeroes(){
    return gql`
    query {
      listHeros {
    Heros {
      description
      id
      name
      slug
      username
    }
  }}
    `
}