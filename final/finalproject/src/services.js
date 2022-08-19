export function fetchAddToCart(productIndex){
    return fetch("/api/v1/cart", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify({ productIndex })
      })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return response
            .json()
            .catch(error => Promise.reject({ error }))
            .then(err => Promise.reject(err));
        });
  }

  export function fetchUpdateCartitem( id, quantity ) {
    return fetch(`/api/v1/cart/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( quantity),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  export function fetchDeleteCartitem(id) {
    return fetch(`/api/v1/cart/${id}`, {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }


export function fetchCart() {
    return fetch(`/api/v1/cart`)
      .catch(() => Promise.reject({ error: "networkError" }))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch(error => Promise.reject({ error }))
          .then(err => Promise.reject(err));
      });
  }

export function fetchCheckout(){ 
    return fetch(`/api/v1/checkout`, {
        method: 'DELETE',
        })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
        if (response.ok) {
          return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
        });
}

export function fetchSession() {
    return fetch('/api/v1/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchLogout() {
    return fetch('/api/v1/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchLogin(username) {
    return fetch('/api/v1/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  export function fetchStore(){
    return fetch('/api/v1/store', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then(
        response => {
        if (response.ok) {
          return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
      });
  }

 