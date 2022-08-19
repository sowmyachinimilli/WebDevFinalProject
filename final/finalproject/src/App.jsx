import './App.css';
import { useState , useEffect } from 'react'; 

import Login from './Login';
import Controls from './Controls';
import Content from './Content';
import Status from './Status';
import Loading from './Loading';

import {
  LOGIN_STATUS,
  SERVER,
  CLIENT,
  CART_STATUS,
} from './constants';

import {
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchStore,
  fetchCart,
  fetchAddToCart,
  fetchUpdateCartitem,
  fetchDeleteCartitem,
  fetchCheckout,
} from './services';

function App() {
  const [ error, setError ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ loginStatus, setLoginstatus ] = useState('LOGIN_STATUS.PENDING');
  const [ cartStatus, setCartstatus ] = useState('CART_STATUS.HIDE_CART');
  const [ products, setProducts ] = useState('');
  const [ cart, setCart ] = useState('');

  function onLogin( username ) {
    fetchLogin(username)
    .then( fetchedproducts => {
      setError('');
      setLoginstatus(LOGIN_STATUS.PENDING);
      setTimeout(()=> { 
        setLoginstatus(LOGIN_STATUS.IS_LOGGED_IN);
        setUsername(username);
        fetchStore().then(fetchedproducts =>{
          setProducts(fetchedproducts);
        });
      },2000);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setLoginstatus(LOGIN_STATUS.PENDING);
    setTimeout(()=>{
      setError('');
      setUsername('');
      setCartstatus(CART_STATUS.HIDE_CART);
      fetchLogout() 
      .then(()=>{
        setLoginstatus(LOGIN_STATUS.NOT_LOGGED_IN);
      })
      .catch((err)=>{
        setError(err?.error || 'ERROR'); 
      })
    },2000);
  }

  function onAddToCart(productIndex){
    fetchAddToCart(productIndex)
    .then( fetchedproduct =>{
      setTimeout(()=>{
        setCart(fetchedproduct);
      },1000);
    })
    .catch(err => {
      setError(err?.error || "ERROR");
    });
  }

  function onViewCart(){
    fetchCart()
    .then( cart => {
    setError('');
    setCartstatus(CART_STATUS.PENDING);
    setTimeout(()=> { 
    setCartstatus(CART_STATUS.SHOW_CART);
    setCart(cart);
    },2000);
    })
    .catch( err => {
        setError(err?.error || 'ERROR');
    });
}

  function onHideCart(){
    fetchStore()
    .then( products => {
      setError('');
      setCartstatus(CART_STATUS.HIDE_CART);
      setProducts(products);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onUpdateCartitem(productIndex, quantity){
    fetchUpdateCartitem(productIndex,quantity)
    .then( ()=> {
      return fetchCart();
    })
    .then( fetchedcart =>{
      setTimeout(()=>{
        setCart(fetchedcart);
        setCartstatus(CART_STATUS.SHOW_CART);
      },500);
    })
    .catch(err => {
      setError(err?.error || "ERROR");
    });
  }

  function onDeleteCartitem(id){
    setError('');
    setCartstatus(CART_STATUS.PENDING);
    fetchDeleteCartitem(id)
      .then( () => {
        return fetchCart(); 
      })
      .then( cart => {
        setCart(cart);
        setCartstatus(CART_STATUS.SHOW_CART);
      })
      .catch( err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onCheckout(){
    setCartstatus(CART_STATUS.CHECKOUT);
    fetchCheckout()
    .then(() =>{
      setTimeout( () => {
        setCart('');
        setCartstatus(CART_STATUS.SHOW_CART);
        return fetchStore();
    },1500); })
  }

  function checkForSession() {
    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginstatus(LOGIN_STATUS.IS_LOGGED_IN);
      fetchStore().then(products =>{
        console.log(products);})
      return fetchStore();
    })
    .catch( err => {
      console.log("err"+err?.error);
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      console.log("promise"+err?.error);
      return Promise.reject(err); 
    })
    .then( products => {
      setProducts(products);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginstatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR'); 
    });
  }

  useEffect(() => {
    checkForSession();
  },
  []
  );

  return (
    <div className="app">
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login_waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin = {onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="app-content">
            <Controls onLogout = {onLogout}/>
            <Content 
            products = {products}
            cart = {cart}
            cartStatus = {cartStatus}
            onDeleteCartitem = {onDeleteCartitem}
            onViewCart = {onViewCart}
            onAddToCart = {onAddToCart} 
            onUpdateCartitem = {onUpdateCartitem}
            onHideCart = {onHideCart} 
            onCheckout = {onCheckout}/>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
