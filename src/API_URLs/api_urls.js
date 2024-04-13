export let api= {}

// const apiBase='http://localhost:1234/';
const apiBase='https://shopoline-api.onrender.com/';

api.newUser=`${apiBase}user/register`;

api.fetchProducts=`https://dummyjson.com/products?limit=100`;

api.loginUser=`${apiBase}user/login`;

api.getCartItems=(user)=>{
    return `${apiBase}products/getCartItems/${user}`;
}

api.delCartItems=(user, id)=>{
    return `${apiBase}products/deleteProduct/${user}/${id}`;
}

api.addItems=`${apiBase}products/addProduct`