import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Square,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  FiArrowRight,
  FiCreditCard,
  FiDollarSign,
  FiLink,
} from 'react-icons/fi';

export const features = [
  {
    name: 'Payment Intents',
    description:
      'The simplest way to collect money. Collect payments directly from your app using Hosted Fields. Client is not required.',
    icon: FiDollarSign,
    href: '/payment-intents',
  },
  {
    name: 'Stored Payment Methods',
    description:
      'Save cards or ach details in our vault, then use them later to process payments.',
    icon: FiCreditCard,
    href: '/payment-intents',
  },
  {
    name: 'Payment Links',
    description:
      'Create a unique payment link for a Client (Matter optional) for a specified amount.',
    icon: FiLink,
    href: '/payment-links',
  },
];

export default function PaymentVehicleSplash() {
  return (
    <Box as='section' bg='bg.surface'>
      <Container pb={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '12', md: '16' }}>
          <Stack spacing={{ base: '4', md: '5' }} maxW='3xl'>
            <Stack spacing='3'>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='semibold'
                color='accent'
              >
                You&apos;re approved!
              </Text>
              <Heading size={{ base: 'sm', md: 'md' }}>
                Let&apos;s collect some money 💸🤑
              </Heading>
            </Stack>
            <Text color='fg.muted' fontSize={{ base: 'lg', md: 'xl' }}>
              Gravity Legal has a payment vehicle to suit your needs. Explore
              the payment vehicles below to find the best one.
            </Text>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            columnGap={8}
            rowGap={{ base: 10, md: 16 }}
          >
            {features.map((feature) => (
              <Stack key={feature.name} spacing={{ base: '4', md: '5' }}>
                <Square
                  size={{ base: '10', md: '12' }}
                  bg='accent'
                  color='gray.100'
                  borderRadius='lg'
                >
                  <Icon as={feature.icon} boxSize={{ base: '5', md: '6' }} />
                </Square>
                <Stack spacing={{ base: '1', md: '2' }} flex='1'>
                  <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='medium'>
                    {feature.name}
                  </Text>
                  <Text color='fg.muted'>{feature.description}</Text>
                </Stack>
                <NextLink href={feature.href} passHref>
                  <Button
                    as='a'
                    variant='outline'
                    colorScheme='blue'
                    rightIcon={<FiArrowRight />}
                    alignSelf='start'
                  >
                    Read more
                  </Button>
                </NextLink>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
