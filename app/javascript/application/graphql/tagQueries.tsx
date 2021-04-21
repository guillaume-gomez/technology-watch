import gql from "graphql-tag";

export const TagFragment = {
  fragments: {
    tag: gql`
      fragment TagFragment on Tag {
        id
        name
        color
      }
    `,
  },
};

export const GetTags = gql`
  query getTags($first: Int, $cursor: String) {
    getTags(first: $first, after: $cursor) {
      edges {
        node {
          ...TagFragment
        }
      }
    }
  }
${TagFragment.fragments.tag}`;