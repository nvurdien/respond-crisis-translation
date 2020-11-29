import {db} from "../firebase";

export const getCases = () => {
    db.collection("cases")
      .get();
};