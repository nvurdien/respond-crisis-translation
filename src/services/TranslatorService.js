import {db} from "../firebase";

export const getTranslators = () => {
    db.collection("translators")
      .get();
};