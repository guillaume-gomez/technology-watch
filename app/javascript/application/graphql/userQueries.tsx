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

export const ResetPassword =  gql`
  mutation resetPassword($email: String!, $redirectUrl: String!) {
    userSendPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      message
    }
  }
`;

export const ResetPasswordWithToken =  gql`
  mutation resetPasswordWithToken($password: String!, $passwordConfirmation: String!, $resetPasswordToken: String!) {
    userUpdatePasswordWithToken(password: $password, passwordConfirmation: $passwordConfirmation, resetPasswordToken: $resetPasswordToken) {
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
      languageCode
    }
  }
`;

export const ConfirmAccount = gql`
  query userConfirmAccount($token: String!, $redirectUrl: String!) {
    userConfirmAccount(confirmationToken: $token, redirectUrl: $redirectUrl) {
      id
      
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

export const EditUser = gql`
  mutation editUser($id: ID!, $name: String, $nickname: String, $languageCode: String) {
    editUser(input: { user: {id: $id, name: $name, nickname: $nickname, languageCode: $languageCode}}) {
      id
      name
      nickname
      languageCode
    }
  }
`;
