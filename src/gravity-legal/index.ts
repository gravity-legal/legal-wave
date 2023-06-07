import { createFirm } from './createFirm';

export const gqlEndpoint =
  process.env.GL_API_ENDPOINT || 'https://api.sandbox.gravity-legal.com/v2';

export default { createFirm };
