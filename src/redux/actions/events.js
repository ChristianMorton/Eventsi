import Firebase, { db } from "../../config/Firebase";

//constants
export const GET_MY_EVENTS = "GET_MY_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";
export const GET_EVENT_MEDIA = "GET_EVENT_MEDIA";

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
        return Promise.resolve();
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

export const getEventMedia = (idOfEvent) => {
  return async (dispatch, getState) => {
    try {
      const uid = Firebase.auth().currentUser.uid;
      if (uid) {
        const res = await db
          .collection("events")
          .doc(idOfEvent)
          .collection("media")
          .get();

        if (res) {
          const eventInfo = [];
          res.forEach((doc) =>
            eventInfo.push({
              id: doc.id,
              //ref: doc.ref,
              slug: doc.data().slug,
              name: doc.data().name,
            })
          );
          dispatch({ type: GET_EVENT_MEDIA, payload: eventInfo });
        }
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };
};
