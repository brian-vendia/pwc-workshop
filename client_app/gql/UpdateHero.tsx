import gql from 'graphql-tag';

export default function UpdateHero()
{
return gql`
    mutation update($id:ID!, $description:String,$name:String, $slug:String,$username:String) {
  updateHero_async(id: $id, input: {description:$description, name: $name, slug: $slug, username: $username}) {
    error
  }
}

`;
}