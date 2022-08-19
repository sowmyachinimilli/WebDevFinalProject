const products = {
    [1]: {
        id: 1,
        name: 'Apple',
        image: '/images/apple.jpeg',
        price: 2.49,
    },
    [2]: {
        id: 2,
        name: 'Banana',
        image: '/images/banana.jpeg',
        price: 1.65,
    },
    [3]:{
        id: 3,
        name: 'Blueberries',
        image: '/images/blueberries.jpeg',
        price: 4.49,
    },
    [4]:{
        id: 4,
        name: 'Greenapple',
        image: '/images/greenapple.png',
        price: 3.99,
    },
    [5]:{
        id: 5,
        name: 'Kiwi',
        image: '/images/kiwi.png',
        price: 2.99,
    },
    [6]:{
        id: 6,
        name: 'Lemon',
        image: '/images/lemon.jpeg',
        price: 4.99,
    },
    [7]:{
        id: 7,
        name: 'Mango',
        image: '/images/mango.jpeg',
        price: 3.49,
    },
    [8]:{
        id: 8,
        name: 'Orange',
        image: '/images/orange.jpeg',
        price: 5.49,
    },
    [9]:{
        id: 9,
        name: 'Pear',
        image: '/images/pear.png',
        price: 6.49,
    },
    [10]:{
        id: 10,
        name: 'Pineapple',
        image: '/images/pineapple.jpeg',
        price: 3.99,
    },
    [11]:{
        id: 11,
        name: 'Red grapes',
        image: '/images/redgrapes.jpeg',
        price: 5.99,
    },
    [12]:{
        id: 12,
        name: 'Strawberries',
        image: '/images/strawberries.jpeg',
        price: 6.49,
    }
};
let userCart={};

function getStoreProducts(){
    const productsList ={};

    productsList.getProducts = function getProducts(){
        return products;
    };

    productsList.addToCart = function addToCart({username, productIndex, quantity}){
        if(!userCart[username]){
            userCart[username] = { 'cart' : [] };
        }
        const cartIndex = userCart[username]['cart'].findIndex( (element) => element.productIndex === productIndex);
        if( cartIndex > -1){
            userCart[username]['cart'][cartIndex]['quantity'] += quantity;
        }
        else{
            userCart[username]['cart'].push({productIndex,quantity});
        }
    }

    productsList.getCart = function getCart(username){
        if(!userCart[username]){
            return userCart[username] = { 'cart' : [] }
        }
        return userCart[username]['cart'];
    }

    productsList.getCartitem = function getCartitem({username, id}){
        const cartIndex = userCart[username]['cart'].findIndex( (element) => element.productIndex === Number(id));
        return userCart[username]['cart'][cartIndex];
    }

    productsList.updateCartitem = function updateCartitem({username, id, quantity}){
        const cartIndex = userCart[username]['cart'].findIndex( (element) => element.productIndex === Number(id));
        userCart[username]['cart'][cartIndex]['quantity'] += quantity;
        if(!userCart[username]['cart'][cartIndex]['quantity']){
            this.deleteCartitem({username,id});
        }
    }

    productsList.deleteCartitem = function deleteCartitem({ username, id }){
        const cartIndex = userCart[username]['cart'].findIndex( (element) => element.productIndex === Number(id));
        delete userCart[username]['cart'][cartIndex];
        userCart[username]['cart'] = userCart[username]['cart'].filter( item => item != null);
    }

    productsList.checkoutCart = function checkoutCart(username) {
        delete userCart[username]['cart'];
        userCart[username] = { 'cart' : [] };
    }

    return productsList;
}

module.exports = {
    getStoreProducts
};