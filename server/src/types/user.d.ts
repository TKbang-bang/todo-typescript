export type UserId = `${string}-${string}-${string}-${string}-${string}`;

export type User = {
  id?: UserId;
  name: string;
  email: string;
  password: string;
};
