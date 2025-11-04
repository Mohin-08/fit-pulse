# FitPulse Dashboard

A modern, personalized fitness tracking web application designed to help users manage their fitness journey with professional guidance, accurate data logging, and ultra-clean aesthetics.

## Features

- **Dashboard Overview**: Visual representation of your fitness progress with charts and statistics
- **Workout Tracking**: Log and monitor your workouts with detailed metrics (duration, calories, intensity)
- **Goal Management**: Set and track fitness goals with progress visualization
- **User Profile**: Manage personal information and body metrics
- **Clean UI/UX**: Modern interface built with Tailwind CSS for an optimal user experience
- **Authentication**: Secure user authentication powered by Supabase (configurable)

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase/PostgreSQL (configurable)
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mohin-08/fit-pulse.git
cd fit-pulse
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Demo Mode

The application can run in demo mode without Supabase configuration. You can explore all features with sample data.

### With Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up the database schema (see Database Schema section)
3. Configure environment variables with your Supabase credentials
4. Use the authentication system to create an account

## Database Schema

When using Supabase, create the following tables:

### Workouts Table
```sql
create table workouts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  type text not null,
  duration integer not null,
  calories integer not null,
  intensity text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Goals Table
```sql
create table goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  progress integer default 0,
  target integer not null,
  unit text not null,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Profiles Table
```sql
create table profiles (
  id uuid references auth.users primary key,
  name text,
  age integer,
  height integer,
  weight integer,
  target_weight integer,
  fitness_level text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
fit-pulse/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navigation.jsx
│   │   └── StatsCard.jsx
│   ├── contexts/         # React contexts
│   │   └── AuthContext.jsx
│   ├── lib/             # Utility libraries
│   │   └── supabase.js
│   ├── pages/           # Application pages
│   │   ├── Dashboard.jsx
│   │   ├── Workouts.jsx
│   │   ├── Goals.jsx
│   │   ├── Profile.jsx
│   │   └── Login.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
