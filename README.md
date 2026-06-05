# 🍽️ Food-booking-app

A modern food delivery landing page built with **HTML**, **CSS**, and **Vanilla JavaScript**.

The project showcases interactive UI components such as tabs, a calorie calculator, image slider, countdown timer, modal windows, dynamic menu cards, and form handling. User preferences and calculator settings are persisted using **LocalStorage**, providing a better user experience across sessions.

The main goal of this project was to practice modern JavaScript development, modular architecture, DOM manipulation, API interaction, and build tools such as Webpack and Babel.

## 🚀 Features

- 📑 Tabbed content navigation
- 🧮 Daily calorie calculator
- 💾 LocalStorage integration for saving user preferences
- 🎠 Interactive image slider
- ⏳ Countdown timer
- 🪟 Modal windows
- 📝 Contact and order forms
- 🍱 Dynamic menu cards loaded from API data
- 📱 Responsive layout
- 📦 Modular JavaScript architecture
- ⚙️ Webpack bundling and Babel transpilation

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Build Tools

- Webpack
- Babel
- Core-JS Polyfills

### Libraries

- Axios

---

## 📂 Project Structure

```text
Food-booking-app/
│
├── css/
│   └── style.css
│
├── icons/
│
├── img/
│   ├── form/
│   ├── slider/
│   └── tabs/
│
├── js/
│   ├── modules/
│   │   ├── calc.js
│   │   ├── cards.js
│   │   ├── forms.js
│   │   ├── modal.js
│   │   ├── slides.js
│   │   ├── tabs.js
│   │   └── timer.js
│   │
│   ├── services/
│   │   └── services.js
│   │
│   ├── script.js
│   ├── bundle.js
│   └── bundle.js.map
│
├── db.json
├── index.html
├── server.php
├── webpack.config.js
├── package.json
└── package-lock.json
```

---

## ⚡ Installation

Clone the repository:

```bash
git clone https://github.com/theromanov/Food-booking-app.git
```

Navigate to the project folder:

```bash
cd Food-booking-app
```

Install dependencies:

```bash
npm install
```

---

## 🔧 Development

Build the project:

```bash
npm run build
```

Run development mode:

```bash
npm run dev
```

> Make sure the corresponding scripts are defined in your `package.json`.

---

## 🎯 Main Components

### Tabs

Allows users to switch between different meal plans:

- Fitness
- Premium
- Vegan
- Balanced

### Calorie Calculator

Calculates daily calorie requirements based on:

- Gender
- Height
- Weight
- Age
- Activity level

Selected values are automatically stored in **LocalStorage** and restored on page reload.

### Slider

Interactive image carousel with:

- Previous/Next navigation
- Current slide counter
- Smooth transitions

### Countdown Timer

Displays the remaining time for promotional offers.

### Modal Window

Reusable modal component used for contact and callback forms.

### Dynamic Menu Cards

Menu cards are generated dynamically from data received via API requests.

---

## 🌐 Browser Support

```json
{
  "browserslist": ["> 0.5%"]
}
```

---

## 📚 Learning Goals

This project was created to practice:

- DOM manipulation
- ES6 modules
- Event handling
- Form validation and submission
- LocalStorage usage
- AJAX requests
- API interaction
- Webpack configuration
- Babel transpilation
- Component-based JavaScript architecture

---

## 👨‍💻 Author

**Roman Romanov**

GitHub: https://github.com/theromanov
