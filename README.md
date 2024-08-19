# Nextjs app router & google signin example

![test](/public/example.gif)

## Getting Started

1. Create a `.env.local` file in the root of the project and add the following

```bash
  cp .env.local.example .env.local
```

2. Generate auth secret key

```bash
  npx auth secret
```

3. Fill up your google client id & secret in `.env.local`

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

5. Run the development server:

```bash
  yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
