const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const items = [
  { id: 1, name: 'Apple', price: 2 },
  { id: 2, name: 'Banana', price: 1 },
  { id: 3, name: 'Carrot', price: 1.5 },
  { id: 4, name: 'Detergent', price: 4 }
];

let cart = [];

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/cart', (req, res) => {
  res.json(cart);
});

app.post('/cart', (req, res) => {
  const { id, quantity = 1 } = req.body;
  const item = items.find(i => i.id === Number(id));
  if (!item) {
    return res.status(400).json({ error: 'Invalid item id' });
  }
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  res.json(cart);
});

app.put('/cart/:id', (req, res) => {
  const item = cart.find(c => c.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not in cart' });
  }
  item.quantity = Number(req.body.quantity) || item.quantity;
  res.json(cart);
});

app.delete('/cart/:id', (req, res) => {
  cart = cart.filter(c => c.id !== Number(req.params.id));
  res.json(cart);
});

app.get('/cart/total', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ total });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
