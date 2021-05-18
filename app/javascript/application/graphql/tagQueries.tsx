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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
${TagFragment.fragments.tag}`;

export const GetTagsNameContains = gql`
  query getTagsNameContains($first: Int, $nameContains: String) {
    getTags(first: $first, nameContains: $nameContains) {
      edges {
        node {
          ...TagFragment
        }
      }
    }
  }
${TagFragment.fragments.tag}`;

export const BulkUpdateTags = gql`
  mutation bulkUpdateTags($tags: [TagBulkType!]! ) {
    bulkUpdateTags(input: { tags: $tags }) {
      edges {
        node {
          ...TagFragment
        }
      }
    }
  }
${TagFragment.fragments.tag}`;