import { db } from "../firebase";

export const getCases = () => {
  return db.collection("cases").get();
};
