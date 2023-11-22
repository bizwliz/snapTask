import { reducer } from '../utils/reducers';
import {
  UPDATE_SNAPS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_DEPARTMENTS,
  UPDATE_CURRENT_DEPARTMENT,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

const initialState = {
  snaps: [],
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false,
  departments: [{ name: 'Food' }],
  currentDepartment: '1',
};

test('UPDATE_SNAPS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_SNAPS,
    snaps: [{}, {}]
  });

  expect(newState.snaps.length).toBe(2);
  expect(initialState.snaps.length).toBe(0);
});

test('ADD_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    snap: { purchaseQuantity: 1 }
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CART_QUANTITY,
    _id: '1',
    purchaseQuantity: 3
  });

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);
  expect(initialState.cartOpen).toBe(false);
});

test('REMOVE_FROM_CART', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_CART,
    _id: '1'
  });

  expect(newState1.cartOpen).toBe(true);
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_CART,
    _id: '2'
  });

  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    snaps: [{}, {}]
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_DEPARTMENTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_DEPARTMENTS,
    departments: [{}, {}]
  });

  expect(newState.departments.length).toBe(2);
  expect(initialState.departments.length).toBe(1);
});

test('UPDATE_CURRENT_DEPARTMENT', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_DEPARTMENT,
    currentDepartment: '2'
  });

  expect(newState.currentDepartment).toBe('2');
  expect(initialState.currentDepartment).toBe('1');
});

test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);
  
  let newState2 = reducer(newState, {
    type: TOGGLE_CART
  });

  expect(newState2.cartOpen).toBe(false);
});
