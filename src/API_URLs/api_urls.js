export let api= {}

const apiBase='http://localhost:1234/';

api.newUser=`${apiBase}user/insert`;

api.fetchProducts=`https://dummyjson.com/products?limit=100`;

api.loginUser=`${apiBase}user/login`;