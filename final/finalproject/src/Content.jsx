import Store from './Store';
import Cart from './Cart';
import Loading from './Loading';
import Checkout from './Checkout';

import ViewCartForm from './ViewCartForm';

import {
    CART_STATUS,
} from './constants';


function Content({products, cart, cartStatus, onViewCart, onAddToCart,
            onUpdateCartitem, onDeleteCartitem, onHideCart, onCheckout}){
   
    const SHOW = { 
        PENDING: 'pending',
        STORE: 'store',
        CART: 'cart',
        CHECKOUT: 'checkout'
    };

    let show;

    if(cartStatus === CART_STATUS.PENDING) {
      show = SHOW.PENDING;
    } else if (cartStatus === CART_STATUS.SHOW_CART) {
      show = SHOW.CART;
    } 
    else if (cartStatus === CART_STATUS.CHECKOUT){
      show = SHOW.CHECKOUT;
    }
    else {
      show = SHOW.STORE;
    }

    return(
        <>
        { show === SHOW.PENDING && <Loading className="cart_waiting">Loading cart...</Loading> }
        { show === SHOW.CART && <Cart 
            products = {products} 
            cart = {cart} 
            onHideCart = {onHideCart} 
            onUpdateCartitem = {onUpdateCartitem}
            onDeleteCartitem = {onDeleteCartitem}
            onCheckout = {onCheckout} />}
        { show === SHOW.STORE && (
            <div className='store'>
            <ViewCartForm onViewCart={onViewCart}/>
            <Store products={products} onAddToCart={onAddToCart}/>
            </div>
        )}
        { show === SHOW.CHECKOUT && <Checkout/>}
        </>
    );
}

export default Content;