import { createServer } from '@/server';

async function startServer() {
  try {
    const { httpServer } = await createServer();

    httpServer.listen(5005, () => {
      console.log(`> Listening on localhost:5005`);
    });
  } catch (e) {
    console.log(`Error starting server: `, e);
    process.exit(1);
  }
}

startServer();
