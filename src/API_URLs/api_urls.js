export let api= {}

const apiBase='http://localhost:1234/';

api.newUser=`${apiBase}user/insert`;

api.fetchProducts=`https://dummyjson.com/products?limit=100`;

api.loginUser=`${apiBase}user/login`;

api.getCartItems=(user)=>{
    return `${apiBase}products/getCartItems/${user}`;
}

api.delCartItems=(user, id)=>{
    return `${apiBase}products/deleteProduct/${user}/${id}`;
}

api.addItems=`${apiBase}products/addProduct`