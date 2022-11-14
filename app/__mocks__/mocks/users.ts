export const users = [
  {
    id: "user_0",
    username: "user_0",
    password: "user_0",
  },
];

export const findUser = (username: string) =>
  users.find((user) => user.username === username);

export const checkPassword =
  (user: typeof users[0] | undefined) => (password: string) =>
    user?.password === password;

export const valid_user = (username: string, password: string) =>
  checkPassword(findUser(username))(password);

export const existUserError = {
  message: "User is Already Existed",
  errorType: "AuthenticationError",
};
