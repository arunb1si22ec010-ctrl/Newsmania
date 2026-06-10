# Newsmania

A modern news aggregation platform that collects, curates, and displays news from multiple sources in one place.

## Features

- Aggregate news from multiple sources
- User-friendly interface
- Search and filter capabilities
- Save favorite articles
- Category-based news organization

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js with Express
- **Database**: MySQL

## Project Structure

```
Newsmania/
├── frontend/          # HTML, CSS, JS files
├── backend/           # Node.js server
├── database/          # MySQL schema and migrations
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/arunb1si22ec010-ctrl/Newsmania.git
cd Newsmania
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Set up MySQL database
```bash
mysql -u root -p < database/schema.sql
```

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the backend server
```bash
npm start
```

6. Open frontend in browser
```bash
open frontend/index.html
```

## API Documentation

### Endpoints

- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get specific article
- `GET /api/news/category/:category` - Get news by category
- `POST /api/favorites` - Save favorite article
- `GET /api/favorites` - Get user's favorite articles

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

MIT License - see LICENSE file for details
