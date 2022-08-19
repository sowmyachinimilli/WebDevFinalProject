import { useState } from "react";

import './Store.css';

function Store({ products, onAddToCart}){
    const[ productIndex, setProductIndex ] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        onAddToCart(productIndex);
      }

    return(
        <div className="storeitems">
        <ul className="storeitemslist">
          { Object.values(products).map( product => (
            <li key={product.id}>
              <div className= "product-layout">
                <div className="product">      
                    <p className="product-name" data-id={product.id}>
                      {product.name}                   
                    </p>
                    <img className="product-image" src={product.image} alt={product.name}/>
                    <p className="product-price">{product.price}</p>
                </div>
                <form className="addcart_form" action="#/addtocart" onSubmit={onSubmit}>
                <button className="btn-addtocart" type="submit" onClick={ () => { setProductIndex(product.id) }}>Add to Cart</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
        </div>
    );
}

export default Store;