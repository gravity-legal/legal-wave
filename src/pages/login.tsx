import { PasswordField } from '@/components/auth/PasswordField';
import { Logo } from '@/components/layout/Logo';
import {
  Box,
  Button,
  Container,
  Flex,
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
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const submitHandler = handleSubmit(async (data) => {
    try {
      const result = await fetch('/api/login', {
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
            <Flex justifyContent='center'>
              <Logo />
            </Flex>
            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
              <Heading size={{ base: 'xs', md: 'sm' }}>
                Login to your Legal Wave account
              </Heading>
              <HStack spacing='1' justify='center'>
                <Text color='muted'>Need an account?</Text>
                <Link href='/signup'>
                  <Button variant='link' colorScheme='blue'>
                    Sign up
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
                  <FormLabel htmlFor='username'>Username</FormLabel>
                  <Input id='username' type='text' {...register('username')} />
                </FormControl>
                <PasswordField {...register('password')} />
              </Stack>
              <Stack spacing='6'>
                <Button variant='solid' colorScheme='blue' type='submit'>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};

export default LoginPage;
