# 🎨 Online Art Gallery

A modern, full-featured web application for showcasing, selling, and discovering digital and physical art. Built with **ASP.NET Core MVC** and **SQL Server**.

🚀 **[View on GitHub](https://github.com/AhapraxAhmed/Online-Art-Gallery)**

---

## 🔥 Key Features

- **🛍️ Storefront & Auctions** — Complete cart/checkout system and real-time bidding for rare pieces.
- **🤖 AI Art Studio** — Generate stunning images from text prompts (via Pollinations.ai).
- **🎭 Artist Dashboard** — Artists can upload work, track views, and manage their portfolio.
- **🛡️ Secure Auth** — OAuth (Google, GitHub, Discord) + 2FA support + secure password hashing.
- **🌐 Community Feed** — Social interactions, likes, comments, and external data from the Art Institute of Chicago.
- **📱 Responsive UI** — Smooth, dark-themed experience with custom cursor effects.
- **🛡️ Admin Panel** — Full control over users, products, orders, and artwork approvals.

---

## 🛠️ Tech Stack

- **Backend:** ASP.NET Core MVC (8.0), Entity Framework Core
- **Database:** SQL Server
- **Authentication:** Cookie Auth, OAuth 2.0, OTP/TOTP 2FA
- **AI Integration:** Pollinations.ai API (Flux Model)
- **Email:** SMTP (Gmail) for order tracking & security
- **Frontend:** Razor Views, JavaScript, Vanilla CSS

---

## 🚀 Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/AhapraxAhmed/Online-Art-Gallery.git
   ```

2. **Update Database:**
   Update your connection string in `appsettings.json` and run:
   ```bash
   dotnet ef database update
   ```

3. **Environment:**
   Create a `.env` file with your OAuth IDs and API keys.

4. **Run:**
   ```bash
   dotnet run
   ```

---

## 👥 User Roles

- **User:** Explore gallery, buy art, bid, use AI tools.
- **Artist:** Everything a User can do + upload art for approval.
- **Admin:** Complete system management and order fulfillment.

---

**© 2026 Art Gallery — Modern Art for Modern Collectors**
