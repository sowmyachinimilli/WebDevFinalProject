import { useState , useEffect } from 'react'; 

import './Cart.css';

function Cart({ products, cart, onHideCart, onUpdateCartitem, onDeleteCartitem ,onCheckout}){

    const [ Total, setTotal ] = useState(0);
    
    let temp;
    let show;

    const SHOW = {  // a constant used only in this component
        CART: 'cart',
        EMPTY: 'empty'
    };

    if(cart.length === 0){
        show = SHOW.EMPTY;
    }
    else{
        show = SHOW.CART;
    }

    function onSubmit(e) {
        e.preventDefault();
        onHideCart();
    }

    useEffect(() => {
        temp=0;
        if(cart.length !== 0){
            cart.forEach(element => {
            const product = products[element.productIndex];
            temp += element.quantity *product.price;
            });
        }
        setTotal(temp.toFixed(2));
      },
      [cart]
    );

    return(
        <div className='cartarea'>
        { show === SHOW.EMPTY && <p className='cartmsg'> Your Cart is Empty</p> }
        { show === SHOW.CART && 
        <>
        <div className="cartitems">
        <p className='carttitle'>Items in your cart:</p>
        <ol className="cartitemslist">
          { Object.values(cart).map( cartitem => (
            <li key={cartitem.productIndex} className="cartitem">
              <div className= "cart-layout">
                <div className="cart">      
                    <p data-id={cartitem.productIndex}>                  
                    </p>
                    <div className='product-details'>
                    <p className='product-name'>{products[cartitem.productIndex].name}</p>
                    <p className='each-price'>${products[cartitem.productIndex].price}</p>
                    </div>
                    <div className="quant-area">
                    <p>Quantity  : </p>
                    <button className="btn-minusone" type="button"
                        onClick={ () => {
                            const id = cartitem.productIndex;
                            onUpdateCartitem(id,{quantity:-1});
                        }}> - </button>
                    <p className="cartitem-qty">{cartitem.quantity}</p>
                    <button className="btn-plusone" type="button" 
                    onClick={
                     () => {
                        const id = cartitem.productIndex;
                        onUpdateCartitem(id,{quantity:1});
                     }   
                    }>+</button>
                    <button className="btn-delete" type="button"
                        onClick= { () => {
                            const id = cartitem.productIndex;
                            onDeleteCartitem(id);}
                        }
                    > &#10060; </button>
                    </div>
                    <p>SubTotal : ${(cartitem.quantity * products[cartitem.productIndex].price).toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        </div>
        <div>
        <p>Cart Total: ${Total}</p>
        </div>
        <div className='checkoutbtn'>
            <button className="btn-checkout" type="button"
            onClick={ ()=> {
                onCheckout();
            }}>Proceed To Checkout</button>
        </div>
        </>
        } 
        <form className="hidecart_form" action="#/hidecart" onSubmit={onSubmit}>
        <button className="btn-hidecart" type="submit">Continue Shopping</button>
        </form>
        </div>
    );
}
export default Cart;