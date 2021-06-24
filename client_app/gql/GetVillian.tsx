import gql from 'graphql-tag';

export default function GetVillian() {
    return gql`
    query getVillian($id: ID!) {
  getVillian(id: $id) {
    description
    id
    name
    slug
    username
  }
}

    `
}