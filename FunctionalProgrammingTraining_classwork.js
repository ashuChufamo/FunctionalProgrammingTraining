const { produce } = require('immer');

// Initial dataStore
let dataStore = {};

// Event Reducer function
const EventReducer = (state, event) => {
  switch (event.type) {
    case 'ADD_ITEM':
      return produce(state, (draft) => {
        draft.items.push(event.payload);
      });
    case 'REMOVE_ITEM':
      return produce(state, (draft) => {
        draft.items = draft.items.filter((item, index) => index !== event.payload);
      });
    // Add more cases for different events
    default:
      return state;
  }
};

// Dispatch Event function
const dispatchEvent = (event) => {
  dataStore = EventReducer(dataStore, event);
};

// Log Actions function 
const logActions = (prefix = '') => (event) => {
  console.log(`${prefix} Event dispatched:`, event);
};

// Undo Action function 
let undoHistory = [];
let redoHistory = [];
const undoAction = (prefix = '') => () => {
  if (undoHistory.length > 0) {
    const lastEvent = undoHistory.pop();
    redoHistory.push(lastEvent);
    dataStore = EventReducer(dataStore, { type: 'UNDO', payload: lastEvent });
    console.log(`${prefix} Action undone:`, lastEvent);
  } else {
    console.log(`${prefix} No actions to undo.`);
  }
};

// Redo Action function
const redoAction = (prefix = '') => () => {
  if (redoHistory.length > 0) {
    const lastEvent = redoHistory.pop();
    undoHistory.push(lastEvent);
    dataStore = EventReducer(dataStore, { type: 'REDO', payload: lastEvent });
    console.log(`${prefix} Action redone:`, lastEvent);
  } else {
    console.log(`${prefix} No actions to redo.`);
  }
};

// Example usage
dataStore = { items: [] }; 

// Define events
const addItemEvent = { type: 'ADD_ITEM', payload: { name: 'Item 1' } };
const removeItemEvent = { type: 'REMOVE_ITEM', payload: 0 };

// Dispatch events
dispatchEvent(addItemEvent);
dispatchEvent(addItemEvent);
dispatchEvent(removeItemEvent);

// Log actions
const logger = logActions('App');
logger(addItemEvent);
logger(addItemEvent);
logger(removeItemEvent);

// Undo and redo actions
undoAction('App')();
undoAction('App')();
redoAction('App')();

console.log(dataStore); 