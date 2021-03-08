import Firebase, { db } from "../../config/Firebase";

//constants
export const GET_MY_EVENTS = "GET_MY_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";

// actions

export const getMyEvents = () => {
  return async (dispatch, getState) => {
    try {
      const currentuser = Firebase.auth().currentUser;

      if (currentuser) {
        const res = await db
          .collection("events")
          .where("owners", "array-contains", currentuser.uid)
          .get();

        if (res) {
          const myEvents = [];
          res.forEach((doc) =>
            myEvents.push({
              ...doc.data(),
              id: doc.id,
              ref: doc.ref,
            })
          );
          dispatch({ type: GET_MY_EVENTS, payload: myEvents });
        }
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };
};

export const createEvent = (eventData) => {
  return async (dispatch, getState) => {
    try {
      const currentuser = Firebase.auth().currentUser;
      if (currentuser) {
        const res = await db
          .collection("events")
          .add({ ...eventData, owners: [currentuser.uid] });
        dispatch({ type: CREATE_EVENT, payload: res.id });
      }
    } catch (e) {
      alert(e);
    }
  };
};
