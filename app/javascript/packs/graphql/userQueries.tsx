import gql from "graphql-tag";

export const SignUp = gql`
  mutation userSignUp($email: String!, $password: String!, $passwordConfirmation: String!, $name: String!, $nickname: String! ) {
    userSignUp(
      email: $email,
      password: $password,
      passwordConfirmation: $passwordConfirmation,
      name: $name,
      nickname: $nickname
    ) {
      user {
        id
      }
      credentials {
        accessToken
        expiry
        tokenType
      }
    }
  }
`;
