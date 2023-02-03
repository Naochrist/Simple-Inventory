# Simple Inventory

## Register
POST localhost:3500/api-v1/users/signup
```
{
  "firstName": "john",
  "lastName": "doe",
  "email": "johndoe@example.com",
  "password": "secret",
  "confirmPassword": "secret"
}
```
## Login
POST localhost:3500/api-v1/users/login
```
{
  "email": "johndoe@example.com",
  "password": "secret"
}
```
## Add Product
POST localhost:3500/api-v1/products
```
{
  "productName": "Paracetamol",
  "productPrice": 500,
  "productType": "Pain Relief"
}
```
## Fetch Products
GET localhost:3500/api-v1/products
## Fetch Product By Id
GET localhost:3500/api-v1/products/a130babd-bc02-40fd-a7a5-d82251f20861
## Add Stock
POST localhost:3500/api-v1/stock
```
{
  "batchId": "pfizer001",
  "productId": "a130babd-bc02-40fd-a7a5-d82251f20861",
  "quantity": 50
}
```
## Fetch Stock
GET localhost:3500/api-v1/stock
## Fetch Stock By Id
GET localhost:3500/api-v1/stock/pfizer001