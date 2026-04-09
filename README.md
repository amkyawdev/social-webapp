# 🌸 Social Webapp

A beautiful **Next.js 14** social application with **Pastel Glassmorphism** design and **Neo-3D** effects, powered by **Supabase** for real-time data.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-3-3ECF8E?style=flat&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)

---

## ✨ Features

### 🎨 Design System
- **Pastel Glassmorphism** - Soft, translucent panels with blur effects
- **Neo-3D Effects** - Perspective transforms with colored shadows
- **Animated Background** - Smooth flowing pastel gradient
- **Custom Components** - GlassCard, PastelButton, ThreeLoader

### 🛠️ Core Features
- **📝 Posts** - Browse community posts from Supabase
- **💬 Real-time Chat** - Live messaging powered by Supabase Channels
- **👥 Groups** - View user profiles with status indicators
- **🔐 Authentication** - Login/Signup with Supabase Auth

### 📱 Responsive Design
- **Desktop** - Traditional navigation bar
- **Mobile** - Blob FAB button with slide-in sidebar

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/social-webapp.git
cd social-webapp

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗂️ Project Structure

```
social-webapp/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Login/Signup pages
│   │   ├── chat/page.tsx         # Real-time Chat
│   │   ├── posts/page.tsx        # Community Posts
│   │   ├── group/page.tsx        # User Groups
│   │   ├── layout.tsx            # Main Layout
│   │   └── page.tsx              # Home Page
│   ├── components/
│   │   ├── layout/               # Navbar
│   │   └── ui/                   # GlassCard, PastelButton, ThreeLoader
│   ├── lib/
│   │   └── supabase.ts           # Supabase Client
│   └── styles/
│       └── globals.css           # Design System CSS
├── tailwind.config.ts            # Tailwind Configuration
└── package.json
```

---

## 🎯 Supabase Database Schema

### Tables Required

```sql
-- Posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (for real-time chat)
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  sender_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  username TEXT,
  status TEXT DEFAULT 'active',
  avatar_url TEXT
);
```

---

## 🖼️ Design Preview

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Peach | `#FFEFD5` | Background gradient |
| Pink | `#FFE4F3` | Background gradient, accents |
| Lavender | `#E7DAFF` | Background gradient, buttons |
| Text Dark | `#4E3B4B` | Primary text color |
| Purple Shadow | `rgba(140,100,180,0.3)` | Neo-3D shadows |

### Key Animations
- `pastelFlow` - 15s gradient animation
- `pageGlide` - Page transition effect
- `float` - Floating card animation
- `pulseGlow` - Button hover glow

---

## 📄 License

MIT License - feel free to use this project for learning and development.

---

<div align="center">

Made with 💜 and <a href="https://supabase.com">Supabase</a>

</div>