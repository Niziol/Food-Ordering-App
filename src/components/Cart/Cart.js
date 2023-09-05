import React, { useContext, useState } from 'react';
import useHttpRequest from '../../hooks/use-httpRequest';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const ORDERS_URL =
	'https://food-order-37e3e-default-rtdb.europe-west1.firebasedatabase.app/orders.json';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const {
		isLoading: isSubbmiting,
		error: submitError,
		sendRequest: sendOrdersRequest,
	} = useHttpRequest();
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		sendOrdersRequest(
			{
				url: ORDERS_URL,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { user: userData, orderedItems: cartCtx.items },
			},
			null
		);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	const isSubbmitingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!didSubmit && !isSubbmiting && cartModalContent}
			{!didSubmit && isSubbmiting && isSubbmitingModalContent}
			{didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
