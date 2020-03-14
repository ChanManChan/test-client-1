import cookie from 'js-cookie';

// set in cookie

export const setCookie = (key, value) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

// remove from cookie

export const removeCookie = key => {
  if (window !== undefined) {
    cookie.remove(key, { expires: 1 });
  }
};

// get from cookie such as stored token (will be useful when we need to make request to server with token)

export const getCookie = key => {
  if (window !== undefined) {
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = key => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next(); //<-- will be accessible in signin and there you can redirect or show the popup alert or whatever you want to do
};

// access user info from localstorage (to confirm that we have the authenticated user)
export const isAuth = () => {
  if (window !== undefined) {
    // we just want to make sure that we grab the 'token' from the browsers cookie that will confirm that we have the cookie as well, not just the user information in the localStorage
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false; //<-- we dont have the authenticated user
      }
    }
  }
};

export const signout = next => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
  //   next(); <-- where we can do something like redirect or showing the message or anything
};

export const updateUser = (response, next) => {
  console.log('UPDATE USER IN LOCAL STORAGE HELPERS:- ', response);
  if (typeof window !== undefined) {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    setLocalStorage('user', auth);
  }
  next();
};
