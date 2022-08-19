const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');
const storedata = require('./storedata');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());


//Sessions
app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if(!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if(username === 'dog'){
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if(!existingUserData) {
        users.addUserData(username, storedata.getStoreProducts());
    }
    
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getCart(username));

});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(sid) {
        res.clearCookie('sid');
    }
    
    if(username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

//store
app.get('/api/v1/store', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
    return;
    }
    res.json(storedata.getStoreProducts().getProducts());
});

//cart
app.get("/api/v1/cart", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    res.json(users.getUserData(username).getCart(username));
  });

app.post("/api/v1/cart", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
      res.status(401).json({ error: "auth-missing" });
      return;
    }
    const { productIndex } = req.body;
    if (!productIndex) {
      res.status(400).json({ error: "required-chat-message" });
      return;
    }
    const storedataList = users.getUserData(username);
    storedataList.addToCart({username, productIndex, quantity:1});
    res.json({cart: storedataList.getCart(username)});
  });

  app.patch('/api/v1/cart/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.params;
    const { quantity } = req.body;
    const storedataList = users.getUserData(username);
    storedataList.updateCartitem({username,id,quantity});
    res.json({cart: storedataList.getCartitem({username,id})});
  });

  app.delete('/api/v1/cart/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.params;
    const storedataList = users.getUserData(username);
    storedataList.deleteCartitem({ username, id });
    res.json(storedataList.getCart(username));
   });

//checkout
app.delete('/api/v1/checkout', (req,res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const storedataList = users.getUserData(username);
    storedataList.checkoutCart(username);
    res.json({username});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));