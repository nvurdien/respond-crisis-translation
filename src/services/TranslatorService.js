import { db } from "../firebase";

export const getTranslators = () => {
  return db.collection("translators").get();
};
