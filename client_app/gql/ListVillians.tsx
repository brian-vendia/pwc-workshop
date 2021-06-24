import gql from 'graphql-tag';

export default function listVillians(){
    return gql`
    query {
      listVillians {
    Villians {
      description
      id
      name
      slug
      username
    }
  }}
    `
}