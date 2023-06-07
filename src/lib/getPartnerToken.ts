export function getPartnerToken(): string {
  const partnerToken = process.env.GL_PARTNER_TOKEN as string;

  if (!partnerToken) {
    throw new Error(
      'GL_PARTNER_TOKEN environment variable is not set. Set this in your .env.local env file.'
    );
  }

  return partnerToken;
}
