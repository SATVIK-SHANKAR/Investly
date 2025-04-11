# 💹 Investly

**Investly** is a smart investment planning web application built with **Next.js** and powered by **real-time market data** from the TradingView API. Based on a user’s investment amount and risk tolerance, the app uses an intelligent algorithm to generate personalized portfolio allocations across asset classes.

## 🎯 Purpose

Investly aims to democratize portfolio allocation for everyday investors. By combining intuitive UI with smart logic, Investly helps users answer:

- _"How should I distribute my money across stocks, bonds, crypto, and cash?"_
- _"What’s a good mix for my current risk profile?"_

Whether you're risk-averse or an aggressive investor, Investly tailors the allocation to match your financial comfort zone.

---

## 🚀 Features

- 📈 **Real-time financial data** using TradingView API
- 🧠 **Smart investment allocation algorithm** based on risk profile
- 📊 **Visual breakdowns** of asset distribution
- 📱 **Mobile-responsive interface**
- ⚡ Built with **Next.js**, **Tailwind CSS**, and **TypeScript**

---

## 🧠 Investment Allocation Algorithm

Investly uses a simple yet effective **rule-based allocation algorithm** that maps user inputs to predefined portfolio mixes.

### 1. **User Input**

- 💰 Investment Amount (e.g., ₹100,000)
- ⚖️ Risk Tolerance:
  - Low
  - Medium
  - High

### 2. **Mapped Portfolio Strategy**

Based on modern portfolio theory (inspired by lazy portfolios like Ray Dalio’s All Weather), each risk level maps to a fixed percentage allocation:

| Asset Class | Low Risk | Medium Risk | High Risk |
|-------------|----------|-------------|-----------|
| Stocks      | 20%      | 50%         | 70%       |
| Bonds       | 50%      | 30%         | 10%       |
| Crypto      | 5%       | 10%         | 15%       |
| Cash        | 25%      | 10%         | 5%        |

> Example: A ₹100,000 investment with "High" risk results in ₹70,000 in stocks, ₹10,000 in bonds, ₹15,000 in crypto, and ₹5,000 in cash.

This approach keeps the logic transparent and extendable for future dynamic modeling or ML integration.

---

## 📦 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Charts**: [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- **API**: Alpha Vantage/data integration

---

## 🧪 Getting Started

### 🔁 Clone the Repository

```bash
git clone https://github.com/your-username/investly.git
cd investly
```

### 📦 Install Dependencies

```bash
npm install
# or
yarn
```

### 🚀 Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## 📈 Future Improvements

- 💡 Dynamic allocation with real-time asset performance
- 🧮 Integration of AI/ML for smarter strategies
- 🛡️ User authentication and portfolio history
- 🌍 Global market support with currency toggles

---

## 🤝 Contributing

Contributions are welcome! Please open issues for bugs or feature suggestions and submit pull requests.

---
