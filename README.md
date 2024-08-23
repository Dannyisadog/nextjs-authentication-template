# Next.js Auth Template

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

3. Fill up your google client id & secret in `.env`

```bash
  ...
  AUTH_GOOGLE_ID=xxxx
  AUTH_GOOGLE_SECRET=xxxx
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
