import gql from 'graphql-tag';

export default function AddHero()
{
return gql`
    mutation add($description:String,$name:String, $slug:String,$username:String) {
  addHero_async( input: {description:$description, name: $name, slug: $slug, username: $username}) {
    error
  }
}

`;
}