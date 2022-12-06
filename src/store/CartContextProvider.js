import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedIteams;

    if (existingCartItem) {
      const updatedIteam = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedIteams = [...state.items];
      updatedIteams[existingCartItemIndex] = updatedIteam;
    } else {
      updatedIteams = state.items.concat(action.item);
    }

    return { items: updatedIteams, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedIteams;
    if (existingCartItem.amount === 1) {
      updatedIteams = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedIteam = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedIteams = [...state.items];
      updatedIteams[existingCartItemIndex] = updatedIteam;
    }
    return { items: updatedIteams, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
