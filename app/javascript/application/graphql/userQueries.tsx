import gql from "graphql-tag";

export const SignUp = gql`
  mutation userSignUp($email: String!, $password: String!, $passwordConfirmation: String!, $name: String!, $nickname: String! ) {
    userSignUp(
      email: $email,
      password: $password,
      passwordConfirmation: $passwordConfirmation,
      name: $name,
      confirmSuccessUrl: "/login",
      nickname: $nickname
    ) {
      user {
        id
      }
    }
  }
`;

export const Login = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      credentials {
        accessToken
        client
        expiry
        uid
      }
    }
  }
`;

export const UserHeader = gql`
  query currentUserHeader {
    currentUser {
      id
      nickname
      name
    }
  }
`;

export const Logout = gql`
  mutation userLogout {
    userLogout {
      authenticatable {
        id
      }
    }
  }
`;
