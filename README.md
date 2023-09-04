![legal wave logo](public/legal-wave-logo.png)

# Legal Wave

Legal Wave is an example application to showcase what can be done with the Gravity Legal payments platform. It is written in Typescript using [Next.js](https://nextjs.org/) a react framework. We also use [Chakra UI](https://chakra-ui.com/) to speed up build the UI.

## Getting Started

You will need a Partner API Token to run this example. You can create a token through our Partner portal at [app.sandbox.gravity-legal.com](https://app.sandbox.gravity-legal.com).

1. Login at [app.sandbox.gravity-legal.com](https://app.sandbox.gravity-legal.com)
2. Go to Settings and create an api token
3. Rename `.env.template` to `.env.local`
4. Place you token in the new env file

```
GL_PARTNER_TOKEN=p_secret_xxxxxxxxxxxxx
```

5. run `npm install`
6. run `npm run dev`

### Database

Legal Wave uses a simple sqlite database file located at `prisma/legal-wave.sqlite`. You can wipe the data and start over by running `npm run reset-db`. This just deletes the sqlite file and replaces it with a blank one.

You can easily view the data with any SQLite data viewer. The one I use is [DB Browser for SQLite](https://sqlitebrowser.org/)
