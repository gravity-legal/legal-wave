import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

export const ConnectionOptionsSplash: FC = (props) => {
  const connectUrl =
    process.env.NEXT_PUBLIC_GL_APP_DOMAIN + '/connect/legal-wave';

  return (
    <Container py={{ base: '16', md: '24' }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
        <Stack spacing={{ base: '4', md: '6' }}>
          <Stack spacing='4'>
            <Text
              fontWeight='semibold'
              color='accent'
              textStyle={{ base: 'sm', md: 'md' }}
            >
              Connect
            </Text>
            <Heading as='h1' size={{ base: 'md', md: 'lg' }}>
              Let's get started 🚀
            </Heading>
          </Stack>
          <Text textStyle={{ base: 'lg', md: 'xl' }} color='fg.muted'>
            Get started by connecting your Legal Wave account to a Gravity Legal
            account.
          </Text>
        </Stack>
        <Accordion defaultIndex={0}>
          <AccordionItem py='4'>
            <AccordionButton gap={4} px='0'>
              <Text as='h2' fontWeight='semibold' textStyle='xl'>
                Connect
              </Text>
              <Badge variant='pill'>Existing Gravity Legal accounts</Badge>
            </AccordionButton>
            <AccordionPanel px='0'>
              <Stack spacing={{ base: '6', md: '8' }}>
                <Stack spacing={{ base: '4', md: '5' }}>
                  <Text color='fg.muted'>
                    With Connect, your users will <strong>connect</strong> their
                    Gravity Legal account to their Legal Wave account.
                    Connecting gives Legal Wave permission to manage the firm's
                    Gravity Legal acount on their behalf.
                  </Text>
                </Stack>
                <Stack spacing={{ base: '4' }}>
                  <Text color='fg.muted'>
                    To get started with Connect follow the link below.
                  </Text>
                  <Link
                    href={connectUrl}
                    isExternal
                    color='accent'
                    rel='opener'
                  >
                    {connectUrl + ' '}
                    <ExternalLinkIcon mx='2px' />
                  </Link>
                </Stack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem py='4'>
            <AccordionButton gap={4} px='0'>
              <Text as='h2' fontWeight='semibold' textStyle='xl'>
                Sign Up Link
              </Text>
              <Badge variant='pill'>New Gravity Legal accounts</Badge>
            </AccordionButton>
            <AccordionPanel px='0'>
              <Stack spacing={{ base: '6', md: '8' }}>
                <Stack spacing={{ base: '4', md: '5' }}>
                  <Text color='fg.muted'>
                    Sign Up Link is for firms who don't already have a Gravity
                    Legal account. Partner's will create a new Firm through the
                    API then direct their users to a unique sign up link for
                    that Firm.
                  </Text>
                </Stack>
                <Stack spacing={{ base: '4' }}>
                  <Text color='fg.muted'>
                    To get started with a new Gravity Legal account, click the
                    button below.
                  </Text>
                  <SignUpForGravityLegalButton />
                </Stack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </SimpleGrid>
    </Container>
  );
};

export interface SignUpForGravityLegalButtonProps {}

const SignUpForGravityLegalButton: FC<SignUpForGravityLegalButtonProps> = (
  props
) => {
  const [loading, setLoading] = useState(false);

  const handleSignUpForGravityLegal = async () => {
    setLoading(true);

    const result = await fetch('/api/get-sign-up-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await result.json();
    window.open(json.link, '_blank');
    setLoading(false);
  };

  return (
    <Button
      alignSelf='start'
      colorScheme='blue'
      isLoading={loading}
      variant='solid'
      onClick={handleSignUpForGravityLegal}
    >
      Sign Up For Gravity Legal
    </Button>
  );
};
