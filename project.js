// Import the Immer library to ensure immutability
import produce from 'immer';

// Define the initial dataStore
const initialDataStore = {
  cart: [],
  user: null,
  history: [],
};

// Define the EventReducer function
const EventReducer = (dataStore, event) => {
  return produce(dataStore, (draft) => {
    switch (event.type) {
      case 'ADD_TO_CART':
        draft.cart.push(event.payload);
        draft.history.push(event);
        break;
      case 'REMOVE_FROM_CART':
        draft.cart = draft.cart.filter((item) => item.id !== event.payload.id);
        draft.history.push(event);
        break;
      case 'LOGIN':
        draft.user = event.payload;
        draft.history.push(event);
        break;
      case 'LOGOUT':
        draft.user = null;
        draft.history.push(event);
        break;
      default:
        break;
    }
  });
};

// Define the dispatchEvent function
const dispatchEvent = (event) => {
  return EventReducer(dataStore, event);
};

// Define the logActions curried function
const logActions = (store) => (event) => {
  console.log(`Event dispatched: ${event.type}`, event);
  return EventReducer(store, event);
};

// Define the undoAction curried function
const undoAction = (store) => () => {
  if (store.history.length > 0) {
    const lastEvent = store.history.pop();
    return EventReducer(store, { type: `UNDO_${lastEvent.type}`, payload: lastEvent.payload });
  }
  return store;
};

// Define the redoAction curried function
const redoAction = (store) => () => {
  if (store.history.length > 0) {
    const lastUndoneEvent = store.history[store.history.length - 1];
    return EventReducer(store, lastUndoneEvent);
  }
  return store;
};

// Example usage
const dataStore = initialDataStore;
const loggedActions = logActions(dataStore);
const undoLastAction = undoAction(dataStore);
const redoLastAction = redoAction(dataStore);

// Dispatching events
const addToCartEvent = { type: 'ADD_TO_CART', payload: { id: 1, name: 'Product 1' } };
const updatedStore = loggedActions(addToCartEvent);

const removeFromCartEvent = { type: 'REMOVE_FROM_CART', payload: { id: 1 } };
const updatedStoreAfterRemoval = loggedActions(removeFromCartEvent);

const loginEvent = { type: 'LOGIN', payload: { id: 1, name: 'John Doe' } };
const updatedStoreAfterLogin = loggedActions(loginEvent);

const logoutEvent = { type: 'LOGOUT' };
const updatedStoreAfterLogout = loggedActions(logoutEvent);

// Undo and redo actions
const storeAfterUndo = undoLastAction();
const storeAfterRedo = redoLastAction();