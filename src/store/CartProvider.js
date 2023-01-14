import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === "ADD_ITEM") {
        const updatedItems = state.items.concat(action.value)
        const updatedTotalAmounnt = state.totalAmount + action.value.price * action.value.amount
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmounnt
        }
    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: "ADD_ITEM", value: item})
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: "REMOVE_ITEM", value: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }
    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider
