import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider'

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);
	const showCartHandle = () => {
		setCartIsShown(true);
	};

	const hideCartHandle = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandle} />}
			<Header onShowCart={showCartHandle} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
