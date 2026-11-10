import { createContext } from "react";

const userContext = createContext({
  loggedInUser: "defaultUser",
  setLoggedInUser: () => {},
});
export default userContext;
