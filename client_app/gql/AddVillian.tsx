import gql from 'graphql-tag';

export default function AddVillian()
{
return gql`
    mutation add($description:String,$name:String, $slug:String,$username:String) {
  addVillian_async( input: {description:$description, name: $name, slug: $slug, username: $username}) {
    error
  }
}

`;
}