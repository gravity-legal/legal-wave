This is an example application meant to showcase the Gravity Legal payments platform.

## Getting Started

You will need a Partner API Token to run this example, which you can get from our team. Hit us up on Slack or email us at support@gravity-legal.com

Create a `.env.local` file in the root with your api token.

```
GL_PARTNER_TOKEN=p_secret_xxxxxxxxxxxxx
```

Next install the dependencies.

```
npm install
```

Run the development server:

```bash
npm run dev
```

It uses a simple sqlite database file located at `prisma/legal-wave.sqlite`
