# Grocery Backend

An Express-based backend providing basic grocery APIs with cart management.

## Running

```
npm install
npm start
```

The server runs on port `3001` by default and supports the following endpoints:

- `GET /items` – list available items
- `GET /cart` – current cart items
- `POST /cart` – add item to cart (`{id, quantity}`)
- `PUT /cart/:id` – update quantity
- `DELETE /cart/:id` – remove item
- `GET /cart/total` – total cart price
