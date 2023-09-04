import { useSession } from '@/components/layout/SessionProvider';
import {
  Badge,
  Box,
  Button,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

export const GravityLegalConnectionStatus: FC = (props) => {
  const session = useSession();
  const { firm, glFirm } = session;

  return (
    <Box as='section' py={{ base: '4', md: '8' }} maxW='3xl'>
      <Box
        bg='white'
        boxShadow='sm'
        borderRadius='lg'
        p={{ base: '4', md: '6' }}
      >
        <Stack spacing='5' divider={<StackDivider />}>
          <Stack
            justify='space-between'
            direction={{ base: 'column', sm: 'row' }}
            spacing='5'
          >
            <Stack spacing='1'>
              <Text textStyle='lg' fontWeight='medium'>
                Connected to Gravity Legal ✅
              </Text>
              <Text textStyle='xs' color='fg.muted'>
                {glFirm?.id}
              </Text>
            </Stack>
            <DisconnectButton />
          </Stack>
          <Stack justify='space-between' direction='row' spacing='4'>
            <Stack spacing='0.5' fontSize='sm'>
              <Text color='fg.emphasized' fontWeight='medium'>
                Application Status
              </Text>
              <Text color='fg.muted'>
                Your payments application is pending. Once approved you'll be
                able to collect money!
              </Text>
            </Stack>

            <Box>
              <Badge colorScheme='yellow'>Pending</Badge>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export interface DisconnectButtonProps {}

const DisconnectButton: FC<DisconnectButtonProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDisconnect = async () => {
    setLoading(true);

    const result = await fetch('/api/disconnect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setLoading(false);
    window.location.reload();
  };

  return (
    <Button alignSelf='start' isLoading={loading} onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
};
