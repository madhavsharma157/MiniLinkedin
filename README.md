# MiniLinkedin


## 🚀 Live Demo

👉 [Live Demo URL](https://preview-mini-linkedin-clone-kzmq8rk4ozytvyb981u7.vusercontent.net/auth/login)  


---

## 🛠️ Stack Used

### Frontend
- **Next.js 14** (React & App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Reusable UI components)

### Backend
- **Next.js API Routes**
- **Node.js**
- **In-memory database** (for demo only)
### Auth
- Custom auth using:
  - Email/password login
  - Session-based tokens (HTTP-only cookies)

---

## 🧑‍💻 Demo User Login

> ⚠️ Currently uses in-memory storage — accounts reset on server restart.

You can register any user via `/setup` or `/register`.

Example:
- Email: `demo@example.com`
- Password: `password123`

---

## 🧰 Features

- ✅ Email/password registration
- ✅ Session management via cookies
- ✅ Create posts, view profile, edit user details
- ✅ Fully responsive UI
- ✅ Tailwind + shadcn components
- ✅ Vercel deploy-ready

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/mini-linkedin-platform.git
   cd mini-linkedin-platform
   Install Dependencies

bash
Copy
Edit
pnpm install  # or npm install
Run the Development Server

bash
Copy
Edit
pnpm dev  # or npm run dev
Access the App
Visit http://localhost:3000

Here is the full folder structure of your mini-linkedin-platform project:

pgsql
Copy
Edit
mini-linkedin-platform/
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
├── README.md
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── setup/
│   │   └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── posts/route.ts
│   │   ├── users/[id]/route.ts
│   │   └── profile/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── create-post/
│   │   └── page.tsx
│   └── profile/
│       ├── [id]/page.tsx
│       └── edit/page.tsx
├── components/
│   ├── theme-provider.tsx
│   ├── error-boundary.tsx
│   ├── setup-required.tsx
│   ├── navbar.tsx
│   ├── post-card.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.tsx
│       └── use-toast.ts
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   ├── utils.ts
│   ├── supabase.ts
│   ├── db.ts
│   ├── auth.ts
│   └── session.ts
├── public/
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles/
│   └── globals.css
└── scripts/
    ├── 01-create-tables.sql
    └── 02-create-functions.sql

    🌐 Deployment
Recommended: Vercel

Push to GitHub and connect to vercel.com

