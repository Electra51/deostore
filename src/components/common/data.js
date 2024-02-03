export const menus = [
  { to: "user", title: "Dashboard", role: 0 },
  {
    to: "promocode",
    title: "Promotion",
    role: 1,
    subMenu: [
      {
        title: "Promo Codes",
        to: "promocode",
      },
      {
        title: "Add Promo Codes",
        to: "addpromocode",
      },
    ],
  },
  { to: "orders", title: "Orders", role: 1 },
  { to: "products", title: "Products", role: 1 },
  { to: "profile", title: "Profile", role: 1 },
  { to: "profile", title: "Profile", role: 0 },
  { to: "/", title: "Back to Home", role: 0 },
  { to: "/", title: "Back to Home", role: 1 },
];
