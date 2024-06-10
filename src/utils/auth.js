// LOGIN
export const login = (user) => {
    localStorage.setItem('auth', JSON.stringify(user))
}

// LOGOUT
export const logout = () => localStorage.removeItem('auth')

// LOGIN STATUS
export const isLogin = () => {
    var myObj = JSON.parse(localStorage.getItem('auth'));
    var size = myObj ? Object.keys(myObj).length  : 0;
    // console.log("localStorage.getItem('auth')",size);
    if (size > 0) return true;
    return false;
}

// GET LOGIN DATA
export const getLoginData = () => {
    return JSON.parse(localStorage.getItem('auth'));
}