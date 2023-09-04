import { Layout } from '@/components/layout/Layout';
import { Session, useSession } from '@/components/layout/SessionProvider';
import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Page = () => {
  const session = useSession();

  const connected = session?.firm?.glApiToken;

  const message = () => {
    if (connected) {
      return 'You are connected to Gravity Legal';
    }

    return 'You are not connected to Gravity Legal';
  };

  return (
    <Layout>
      <Box
        as='section'
        bg='bg.surface'
        pt={{ base: '4', md: '8' }}
        pb={{ base: '12', md: '24' }}
      >
        <Container>
          <Stack spacing='1'>
            <Heading size={{ base: 'xs', md: 'sm' }} fontWeight='medium'>
              Settings
            </Heading>
            <Text color='fg.muted'>All registered users in the overview</Text>
          </Stack>
          <Stack spacing='5' mt='10'>
            <Stack
              spacing='4'
              direction={{ base: 'column', sm: 'row' }}
              justify='space-between'
            >
              <Box>
                <Text textStyle='lg' fontWeight='medium'>
                  Gravity Legal
                </Text>
                <Text color='fg.muted' textStyle='sm'>
                  You are connected to Gravity Legal
                </Text>
              </Box>
              {connected ? (
                <DisconnectButton session={session} />
              ) : (
                <ConnectButton session={session} />
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export interface ConnectedProps {
  session: Session;
}

const DisconnectButton: FC<ConnectedProps> = (props) => {
  return <Button alignSelf='start'>Disconnect</Button>;
};

const ConnectButton: FC<ConnectedProps> = (props) => {
  return <Button alignSelf='start'>Connect</Button>;
};

export default Page;
