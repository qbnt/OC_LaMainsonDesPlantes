import Banner from './Banner'
import logo from '../assets/logo.png'
import Cart from './Cart'
import Footer from './Footer'
import ShoppingList from './ShoppingList'
import '../styles/App.css'
import { useEffect, useState } from 'react'

function App() {
	const savedCart = localStorage.getItem('cart');
	const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
	const [activeCategory, setActiveCategory] = useState('')

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	return (
		<div>
			<Banner>
				<img src={logo} alt='La maison jungle' className='lmj-logo' />
				<h1 className='lmj-title'>La maison jungle</h1>
			</Banner>
			<div className='lmj-layout-inner'>
				<Cart
					cart={cart}
					updateCart={updateCart}
				/>
				<ShoppingList
					cart={cart}
					updateCart={updateCart}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
			</div>
			<Footer />
		</div>
	)
}

export default App