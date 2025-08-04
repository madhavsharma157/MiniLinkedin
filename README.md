# MiniLinkedIn - Professional Community Platform

A modern, full-stack community platform built with Next.js, featuring user authentication, post creation, and profile management. This project demonstrates a complete LinkedIn-like social platform with a clean, professional interface.

## 🚀 Live Demo

\`\`\`
[Deploy to get your live demo URL]
\`\`\`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (React), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: In-memory storage (for demo purposes)
- **Authentication**: Custom session-based auth with HTTP-only cookies
- **UI Components**: shadcn/ui
- **Deployment**: Vercel (recommended)

## ✨ Features

### Core Features
- ✅ **User Authentication**
  - Email/password registration and login
  - Secure session management with HTTP-only cookies
  - Protected routes and API endpoints

- ✅ **User Profiles**
  - Profile creation with name, email, bio
  - Profile editing functionality
  - User profile pages with post history

- ✅ **Post Management**
  - Create text-only posts (up to 1000 characters)
  - Public post feed with real-time updates
  - Post display with author info and timestamps

- ✅ **Social Features**
  - Home feed with all posts
  - Individual user profile pages
  - Post author linking and navigation

### Additional Features
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Clean, professional LinkedIn-like interface
- 🔒 **Security**: Session-based authentication with secure cookies
- ⚡ **Performance**: Optimized with Next.js App Router
- 🚀 **Easy Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 🏗️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone the Repository
\`\`\`bash
git clone [your-repo-url]
cd mini-linkedin-platform
npm install
\`\`\`

### 2. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Ready to Use!
No additional configuration needed! The app uses in-memory storage for demo purposes, so you can start using it immediately.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Deployment Options
- **Netlify**: Works with Next.js
- **Railway**: Full-stack deployment
- **Render**: Free tier available

## 👥 Demo Users

The application comes with pre-loaded demo accounts:

### Demo Account 1
- **Email**: demo@example.com
- **Password**: demo123
- **Profile**: Demo User with welcome message

### Demo Account 2
- **Email**: john@example.com  
- **Password**: john123
- **Profile**: John Smith, Software Engineer

You can also create your own account using the registration form.

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── posts/route.ts
│   │   ├── users/[id]/route.ts
│   │   └── profile/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── create-post/page.tsx
│   ├── profile/
│   │   ├── [id]/page.tsx
│   │   └── edit/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── navbar.tsx
│   └── post-card.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── session.ts
└── README.md
\`\`\`

## 🔧 API Endpoints

### Authentication
- \`POST /api/auth/register\` - Create new account
- \`POST /api/auth/login\` - Sign in user
- \`POST /api/auth/logout\` - Sign out user
- \`GET /api/auth/me\` - Get current user

### Posts
- \`GET /api/posts\` - Get all posts
- \`POST /api/posts\` - Create new post

### Users
- \`GET /api/users/[id]\` - Get user profile and posts
- \`PUT /api/profile\` - Update current user profile

## 🛡️ Security Features

- **Session-based Authentication**: Secure HTTP-only cookies
- **Protected Routes**: Authentication required for sensitive pages
- **Input Validation**: Server-side validation for all inputs
- **XSS Protection**: Proper data sanitization
- **CSRF Protection**: Built-in Next.js protections

## 🎨 UI/UX Features

- **Clean Design**: Professional LinkedIn-inspired interface
- **Responsive Layout**: Mobile-first design approach
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🔄 Database Note

This demo uses **in-memory storage** for simplicity and easy deployment. In a production environment, you would replace this with:

- **PostgreSQL** with Prisma ORM
- **MongoDB** with Mongoose
- **MySQL** with TypeORM
- **Supabase** for hosted PostgreSQL

The database interface in \`lib/db.ts\` can be easily swapped out for any real database solution.

## 🔄 Future Enhancements

- [ ] **Real Database**: PostgreSQL/MongoDB integration
- [ ] **Like System**: Post likes and reactions
- [ ] **Comments**: Post commenting system
- [ ] **Connections**: User following/connection system
- [ ] **Image Uploads**: Profile pictures and post images
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Search**: User and post search functionality
- [ ] **Notifications**: In-app notification system
- [ ] **Email Verification**: Email confirmation for registration
- [ ] **Password Reset**: Forgot password functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library

---

**Built with ❤️ using Next.js and TypeScript**
\`\`\`
