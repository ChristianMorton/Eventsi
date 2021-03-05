import Firebase, { db } from "../../config/Firebase";

//constants
export const GET_EVENT = "GET_EVENT";

// actions

export const getEvent = () => {
  return async (dispatch, getState) => {
    try {
      const currentuser = Firebase.auth().currentUser;

      if (currentuser) {
        const res = await db
          .collection("events")
          .doc("nz306PinMlynaTfTpPMC")
          .collection("chat")
          .get();

        if (res) {
          res.forEach((doc) =>
            console.log(doc.name + "=>" + doc.timeSent + "\n" + doc.message)
          );
          console.log(res);

          dispatch({ type: GET_EVENT, payload: res });
        }
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };
};
