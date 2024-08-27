# [Next.js Auth Template](https://nextauth.dannyisadog.com)

The nextjs-authjs-template is a robust starter template for building modern web applications with Next.js and Auth.js (formerly NextAuth.js). This template is designed to streamline the development process by providing a pre-configured setup that integrates user authentication and authorization seamlessly into your Next.js project.

## Use Cases:
- Rapidly prototype and deploy Next.js applications with built-in authentication.
- Start new projects with a solid foundation, reducing the boilerplate code required for user management.

<img src="/public/example1.png" alt="signin page" width="250"/> <img src="/public/example2.png" alt="register page" width="250"/> <img src="/public/example3.png" alt="info page" width="250"/>

## Getting Started

1. Create a `.env` file in the root of the project and add the following

```bash
  cp .env.example .env
```

2. Generate auth secret key

```bash
  npx auth secret
```

3. Fill up your google & github client id & secret in `.env`

```bash
  ...
  AUTH_GOOGLE_ID=xxxx
  AUTH_GOOGLE_SECRET=xxxx
  
  AUTH_GITHUB_ID=xxxx
  AUTH_GITHUB_SECRET=xxxx
  ...
```

4. Install dependencies

```bash
  yarn install
```

5. Start postgres database

```bash
  docker-compose up -d
```

6. Run the development server:

```bash
  yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
