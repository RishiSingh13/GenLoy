# GenLoy

> AI-powered website generator that transforms natural language prompts into responsive, production-ready websites within seconds.

---

## Overview

GenLoy is a modern AI SaaS platform that enables users to generate complete websites simply by describing their ideas. The platform leverages powerful Large Language Models to create clean, responsive frontend code with an instant live preview, secure authentication, and a credit-based generation system.

Designed with scalability and performance in mind, GenLoy combines modern web technologies with AI to simplify website creation for developers, startups, freelancers, and businesses.

---

## Features

- AI-powered website generation from text prompts
- Responsive and production-ready output
- Real-time live preview
- Secure Google Authentication
- Automatic Sign Up / Sign In
- Credit-based generation system
- Stripe payment integration
- Fast and modern user interface
- Secure backend APIs
- Protected routes
- Clean and scalable architecture
- Responsive design across all devices

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Redux Toolkit
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt
- Cookie Parser
- CORS

### Authentication

- Google OAuth
- JWT Tokens
- HTTP-Only Cookies
- Protected Routes
- Automatic Login Detection

### AI

- OpenRouter API
- Multiple LLM Support
- AI Prompt Processing
- Website Code Generation

### Payments

- Stripe Payment Gateway
- Credit Purchase System
- Secure Webhooks
- Subscription Ready Architecture

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## Folder Structure

```
GenLoy/
│
├── client/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── public/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

## Workflow

1. User signs in using Google Authentication.
2. JWT token is generated securely.
3. User enters a website prompt.
4. AI processes the prompt using OpenRouter.
5. Website code is generated.
6. Live preview is displayed instantly.
7. Credits are deducted after successful generation.
8. Users can continue generating websites or purchase additional credits.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/GenLoy.git
```

### Navigate

```bash
cd GenLoy
```

### Install Client

```bash
cd client
npm install
```

### Install Server

```bash
cd ../server
npm install
```

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
cd ../client
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```
PORT=

MONGODB_URI=

JWT_SECRET=

OPENROUTER_API_KEY=

GOOGLE_CLIENT_ID=

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

CLIENT_URL=
```

---

## Security

- JWT Authentication
- Password Encryption using Bcrypt
- HTTP-Only Cookies
- Protected Backend Routes
- Secure Stripe Webhooks
- CORS Protection
- Environment Variable Isolation

---

## Future Improvements

- Code Export
- Multi-page Website Generation
- Project Dashboard
- Custom Domain Support
- Version History
- Team Collaboration
- AI Chat Assistant
- One-click Deployment
- Template Marketplace
- Dark & Light Themes

---

## Performance

- Fast Vite Development Server
- Optimized React Components
- Lazy Loading
- Responsive Layout
- Scalable REST APIs
- Efficient Database Queries

---

## Learning Outcomes

Building GenLoy involved working with:

- Full Stack Development
- REST API Design
- Authentication & Authorization
- Google OAuth Integration
- MongoDB Database Design
- AI API Integration
- Payment Gateway Integration
- Credit Management Systems
- Responsive UI Design
- State Management with Redux Toolkit
- Production Deployment

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Rishi Singh**

Second-Year Computer Science Engineering Student

Passionate about Full Stack Development, Artificial Intelligence, and building scalable SaaS applications.

---

## Support

If you found this project useful, consider giving it a star.

```
Star the repository if you like the project.
```
