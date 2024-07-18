
// FunctionalProgrammingTraining_part1.test.js
import { EventReducer, dispatchEvent, initialDataStore } from './FunctionalProgrammingTraining_part1.js';

describe('FunctionalProgrammingTraining_part1', () => {
  it('should update the dataStore correctly', () => {
    // Test adding an item
    const addItemEvent = { type: 'ADD_ITEM', payload: { id: 1, name: 'Product 1' } };
    const newDataStore = dispatchEvent(addItemEvent);
    expect(newDataStore.items).toEqual([{ id: 1, name: 'Product 1' }]);

    // Test adding an item to the cart
    const addToCartEvent = { type: 'ADD_TO_CART', payload: { id: 1, name: 'Product 1' } };
    const updatedDataStore = dispatchEvent(addToCartEvent);
    expect(updatedDataStore.cart).toEqual([{ id: 1, name: 'Product 1' }]);

    // Test logging in a user
    const loginUserEvent = { type: 'LOGIN_USER', payload: { id: 1, name: 'John Doe' } };
    const finalDataStore = dispatchEvent(loginUserEvent);
    expect(finalDataStore.user).toEqual({ id: 1, name: 'John Doe' });
  });
});

module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
  };