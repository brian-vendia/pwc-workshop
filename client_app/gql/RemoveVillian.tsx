import gql from 'graphql-tag';

export default function RemoveVillian() {
  return gql`
   mutation MyMutation($id:ID! ) {
  removeVillian_async(id: $id){error}
}

    `
}