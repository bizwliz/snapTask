// Import your updated action types
import {
  UPDATE_TASKS, 
  UPDATE_CURRENT_TASK,
  UPDATE_SNAPS,
  UPDATE_CURRENT_SNAPS,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART_QUANTITY,
  TOGGLE_CART,
  UPDATE_DEPARTMENTS,
  UPDATE_CURRENT_DEPARTMENT,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SNAPS:
      return {
        ...state,
        snaps: [action.snap],
      };

      case UPDATE_CURRENT_SNAPS: 
      return {
        ...state,
        currentSnap: action.currentSnap
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.snap],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.snaps],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(snap => {
          if (action._id === snap._id) {
            snap.purchaseQuantity = action.purchaseQuantity
          }
          return snap;
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(snap => {
        return snap._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    case UPDATE_DEPARTMENTS:
      return {
        ...state,
        departments: [...action.departments],
      };

    case UPDATE_CURRENT_DEPARTMENT:
      return {
        ...state,
        currentDepartment: action.currentDepartment
      };

      case UPDATE_TASKS:  // Add UPDATE_TASKS
      return {
        ...state,
        tasks: [...action.tasks],
      };

    case UPDATE_CURRENT_TASK:  // Add UPDATE_CURRENT_TASK
      return {
        ...state,
        currentTask: action.currentTask
      }

    default:
      return state;
  }
};
