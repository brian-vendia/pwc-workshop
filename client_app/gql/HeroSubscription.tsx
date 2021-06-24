import gql from 'graphql-tag';

export default function HeroSubscription() {
    return gql`
subscription HeroSubscription {
  onAddHero {
    result {
      description
      id
      name
      slug
      username
    }
  }
}

  `
}