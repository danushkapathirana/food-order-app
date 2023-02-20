import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css"

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => (
    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={cartItemAddHandler.bind(null, item)} onRemove={cartItemRemoveHandler.bind(null, item.id)} />
    ))}</ul>

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    return(
        <Modal onClick={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onCloseCart} />}
            {!isCheckout && modalActions}
        </Modal>
    )
}

export default Cart
