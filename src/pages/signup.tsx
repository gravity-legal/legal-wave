import { Logo } from '@/frontend/components/Logo';
import { PasswordField } from '@/frontend/components/PasswordField';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  firmName: string;
  email: string;
  password: string;
}

export const SignupPage: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const submitHandler = handleSubmit(async (data) => {
    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Container
      maxW='lg'
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <form onSubmit={submitHandler}>
        <Stack spacing='8'>
          <Stack spacing='6'>
            <Logo />
            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
              <Heading size={{ base: 'xs', md: 'sm' }}>
                Sign up for a Legal Wave account
              </Heading>
              <HStack spacing='1' justify='center'>
                <Text color='muted'>Already have an account?</Text>
                <Link href='/login'>
                  <Button variant='link' colorScheme='blue'>
                    Login
                  </Button>
                </Link>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='firmName'>Firm name</FormLabel>
                  <Input id='firmName' type='text' {...register('firmName')} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' {...register('email')} />
                </FormControl>
                <PasswordField {...register('password')} />
              </Stack>
              <Stack spacing='6'>
                <Button
                  variant='solid'
                  colorScheme='blue'
                  type='submit'
                  isLoading={loading}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};

export default SignupPage;
