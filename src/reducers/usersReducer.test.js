import deepFreeze from "deep-freeze";
import userReducer from "./usersReducer";

describe("userReducer", () => {
  test("returns new state with action TOGGLE_FOUND", () => {
    const state = [];

    const action = {
      type: "TOGGLE_FOUND",
      payload: {
        username: "createdbyRESTclient",
        name: "Rest Client",
        items: [
          {
            _id: "62565ba91deb9560fccc3ac8",
            latin: "Scleroderma citrinum",
            common: ["Common earthball"],
            __v: 0,
          },
        ],
      },
    };

    // The deepFreeze(state) command ensures that the reducer 
    // does not change the state of the store given to it as a parameter.
    deepFreeze(state);
    const newState = userReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });
});
