// Initial dataStore
let dataStore = {
  cart: [],
  user: { name: "", isLoggedIn: false },
  history: []
};

// Event Reducer
const EventReducer = (dataStore, event) => {
  switch (event.type) {
    case "ADD_TO_CART":
      return {
        ...dataStore,
        cart: [...dataStore.cart, event.payload],
        history: [...dataStore.history, event]
      };
    case "REMOVE_FROM_CART":
      return {
        ...dataStore,
        cart: dataStore.cart.filter((item) => item !== event.payload),
        history: [...dataStore.history, event]
      };
    case "LOGIN":
      return {
        ...dataStore,
        user: { name: event.payload.name, isLoggedIn: true },
        history: [...dataStore.history, event]
      };
    case "LOGOUT":
      return {
        ...dataStore,
        user: { name: "", isLoggedIn: false },
        history: [...dataStore.history, event]
      };
    default:
      return dataStore;
  }
};

// Dispatch Event
const dispatchEvent = (event) => {
  dataStore = EventReducer(dataStore, event);
  updateOutput();
};

// Update output
const updateOutput = () => {
  console.log(JSON.stringify(dataStore, null, 2));
};

// Example usage
dispatchEvent({ type: "ADD_TO_CART", payload: "Product A" });
dispatchEvent({ type: "ADD_TO_CART", payload: "Product B" });
dispatchEvent({ type: "REMOVE_FROM_CART", payload: "Product A" });
dispatchEvent({ type: "LOGIN", payload: { name: "John Doe" } });
dispatchEvent({ type: "LOGOUT" });