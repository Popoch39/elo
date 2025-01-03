import { User } from "./types/types";

export const sayHello = (user: User): void => {
  console.log(
    `salut toi ! tu est ${user.firstName} ${user.lastName} et tu as ${user.age}`
  );
};
