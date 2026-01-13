# iPhone Daddy E-commerce Website

A modern, responsive e-commerce website for selling iPhones and merchandise built with React, TailwindCSS, Node.js, and MongoDB.

## Features

- Responsive design with TailwindCSS
- Product catalog for iPhones and merchandise
- Admin dashboard for managing products
- AI-powered chatbot assistant
- WhatsApp integration
- Secure authentication system
- Modern UI/UX design

## Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **AI Integration**: OpenAI API
- **Styling**: TailwindCSS

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd iphone-daddy
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/iphone-daddy

# JWT
JWT_SECRET=your_jwt_secret_key_here

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Port
PORT=5000
```

4. Run the application:
```bash
# Development mode
npm run dev

# Or separately:
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
cd frontend
npm run dev
```

## Admin Access

- Email: `admin@iphonedaddy.com`
- Password: `admin123`

## Project Structure

```
iphone-daddy/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── css/
│   │   ├── js/
│   │   ├── assets/
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── uploads/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Merchandise
- `GET /api/merchandise` - Get all merchandise
- `GET /api/merchandise/:id` - Get merchandise by ID
- `POST /api/merchandise` - Add new merchandise (admin only)
- `PUT /api/merchandise/:id` - Update merchandise (admin only)
- `DELETE /api/merchandise/:id` - Delete merchandise (admin only)

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth` - Get user info (requires token)

### Chat
- `POST /api/chat` - Get response from AI assistant

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENAI_API_KEY` - OpenAI API key for chatbot
- `PORT` - Server port (default: 5000)

## Admin Dashboard

The admin dashboard allows administrators to:
- View dashboard overview
- Manage products (add, edit, delete)
- Manage merchandise (add, edit, delete)
- View orders
- Manage users

Access the admin dashboard at `/admin` and log in with the admin credentials.

## Chatbot Assistant

The AI chatbot assistant is integrated into the website and can answer questions about:
- Products
- Shipping
- Returns
- Store policies

## WhatsApp Integration

Customers can contact the admin directly via WhatsApp using the floating button on the website.

## Deployment

For production deployment:

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Set `NODE_ENV=production` in your environment variables

3. Run the server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.