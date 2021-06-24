import gql from 'graphql-tag';

export default function UpdateVillian()
{
return gql`
    mutation update($id:ID!, $description:String,$name:String, $slug:String,$username:String) {
  updateVillian_async(id: $id, input: {description:$description, name: $name, slug: $slug, username: $username}) {
    error
  }
}

`;
}