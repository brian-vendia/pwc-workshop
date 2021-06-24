import gql from 'graphql-tag';

export default function RemoveHero() {
  return gql`
   mutation MyMutation($id:ID! ) {
  removeHero_async(id: $id){error}
}

    `
}