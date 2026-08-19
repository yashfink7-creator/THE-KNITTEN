# The Knitten

Frontend for **The Knitten** — a handmade crochet e-commerce website. Customers can browse and buy handmade crochet products (toys, bags, wearables, home decor, flowers, accessories), request custom orders, and contact the shop. Includes an admin panel for managing products, orders, messages, and categories.

Built with React (Vite), plain CSS, and mock/dummy data — no backend yet. The backend (PHP + MySQL) is being built separately.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
frontend/
  src/
    components/   shared UI (layout, product cards, common icons)
    pages/         customer-facing pages (Home, Shop, Collections, Cart, etc.)
    admin/         admin panel (Dashboard, Products, Orders, Messages, Categories)
    data/          mock data (products, categories, orders, messages)
    context/       CartContext (shopping cart state)
    styles/        global styles, design tokens, forms
```
