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
import { BsFillMoonFill, BsStars } from 'react-icons/bs';
import { FaAccessibleIcon, FaExpandAlt, FaPaintBrush } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { IoRocketSharp } from 'react-icons/io5';

export const features = [
  {
    name: 'Payment Intents',
    description:
      'The simplest way to collect money. Collect payments from your form using our Hosted Fields. A Client is not required.',
    icon: BsStars,
    href: '/payment-intents',
  },
  {
    name: 'Production Ready',
    description:
      'Effortlessly create your next production-ready experience with Chakra UI Pro components.',
    icon: IoRocketSharp,
    href: '/payment-intents',
  },
  {
    name: 'Light & Dark',
    description:
      'All components support a light and a dark color mode out of the box.',
    icon: BsFillMoonFill,
    href: '/payment-intents',
  },
  {
    name: 'Themeable',
    description:
      "Your style. Your blue. Customize the components as you need them. It's that simple.",
    icon: FaPaintBrush,
    href: '/payment-intents',
  },
  {
    name: 'Fully Responsive',
    description:
      'Responsive components that look great on mobile, tablet and desktop.',
    icon: FaExpandAlt,
    href: '/payment-intents',
  },
  {
    name: 'Accessible',
    description:
      "Accessibility first. That's why we pay attention to accessibility right from the start.",
    icon: FaAccessibleIcon,
    href: '/payment-intents',
  },
];

export default function PaymentVehicleSplash() {
  return (
    <Box as='section' bg='bg.surface'>
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '12', md: '16' }}>
          <Stack spacing={{ base: '4', md: '5' }} maxW='3xl'>
            <Stack spacing='3'>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='semibold'
                color='accent'
              >
                You're approved!
              </Text>
              <Heading size={{ base: 'sm', md: 'md' }}>
                Let's collect some money 💸🤑
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
                    variant='text'
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
