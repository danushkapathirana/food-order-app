import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === "ADD_ITEM") {
        const updatedTotalAmounnt = state.totalAmount + action.item.price * action.item.amount
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id) //check whether there is an existing item or not
        const existingCartItem = state.items[existingCartItemIndex] //get that item
        let updatedItems
        
        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmounnt
        }
    }
    
    if(action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmounnt = state.totalAmount - existingCartItem.price
        let updatedItems

        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id)
        } else {
            const updatedItem =  {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmounnt
        }
    }

    if(action.type === "CLEAR") {
        return defaultCartState
    }

    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: "ADD_ITEM", item: item})
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: "REMOVE_ITEM", id: id})
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: "CLEAR"})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider
