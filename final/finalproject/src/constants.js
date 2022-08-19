export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    default: 'Something went wrong.  Please try again',
};

export const ACTIONS = {
    LOG_IN: "logIn",
    LOG_OUT: "logOut",
    START_LOADING_STORE: "startloadingstore",
    REPORT_ERROR: "reportError",
};

export const CART_STATUS = {
    HIDE_CART: 'hidecart',
    PENDING: 'pending',
    SHOW_CART: 'showcart',
    CHECKOUT: 'checkout'
}