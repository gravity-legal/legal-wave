import { startPaymentSession } from '@/gravity-legal/startPaymentSession';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { CreditCardBrandIcon } from '@/frontend/components/credit-cards/CreditCardBrandIcon';
import HostedFieldInput from '@/frontend/components/HostedFieldInput';
import { useGravityLegal } from '@/frontend/hooks/useGravityLegal';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import currency from 'currency.js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  amount: string;
  email: string;
}

interface PaymentResult {
  amountProcessed: number;
  status: 'success' | 'partial_success' | 'failure';
}

export const CollectMoneyPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ paymentToken }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState<'card' | 'ach'>('card');
  const [result, setResult] = useState<PaymentResult>();
  const [error, setError] = useState<any>(null);

  const { state: hostedFieldsState } = useGravityLegal(paymentToken, formType);

  const handleTabsChange = (index: number) => {
    setFormType(index === 0 ? 'card' : 'ach');
  };

  const submitHandler = handleSubmit(
    async (data) => {
      setLoading(true);

      const { error } = await window.gravityLegal.submitFields();

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      try {
        const amountInCents = currency(data.amount, {
          errorOnInvalid: true,
        }).intValue;

        const result = await fetch('/api/complete-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInCents,
            email: data.email,
            paymentToken,
            paymentMethod: hostedFieldsState?.paymentMethod,
          }),
        });

        setResult(await result.json());
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    (data) => {
      console.log('invlaid', data);
    }
  );

  if (result) {
    return (
      <Container
        maxW='lg'
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'white' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          position='relative'
        >
          <Stack spacing='6' textAlign='center'>
            <Heading>Success!</Heading>
            <Button variant='link' onClick={() => router.reload()}>
              Collect more
            </Button>
          </Stack>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxW='lg'
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing='8'>
        {hostedFieldsState?.loadError && (
          <Alert status='error' variant='solid'>
            <AlertIcon />
            <span>{hostedFieldsState.loadError.message}</span>
          </Alert>
        )}

        {error && (
          <Alert status='error' variant='solid'>
            <AlertIcon />
            <span>{error}</span>
          </Alert>
        )}

        <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
          <Heading>It's time you got paid</Heading>
        </Stack>

        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'white' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          position='relative'
        >
          <form onSubmit={submitHandler}>
            <Stack spacing='6'>
              <FormControl>
                <FormLabel htmlFor='amount'>Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon children='USD' />
                  {/* <Input
                    as={MaskedInput}
                    id='amount'
                    mask={createNumberMask({
                      prefix: '$',
                      suffix: '',
                      includeThousandsSeparator: true,
                      thousandsSeparatorSymbol: ',',
                      allowDecimal: true,
                      decimalSymbol: '.',
                      decimalLimit: 2,
                      integerLimit: 6,
                      allowNegative: false,
                      allowLeadingZeroes: false,
                    })}
                    type='text'
                    placeholder='$10.00'
                    {...register('amount', { required: true })}
                  /> */}
                  <Input
                    id='amount'
                    type='text'
                    placeholder='$10.00'
                    {...register('amount', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email for receipt</FormLabel>
                  <Input id='email' type='email' {...register('email')} />
                </FormControl>
              </Stack>

              <Divider />

              <Tabs
                colorScheme='blue'
                index={formType === 'card' ? 0 : 1}
                variant='soft-rounded'
                onChange={handleTabsChange}
              >
                <TabList>
                  <Tab>Card</Tab>
                  <Tab>Bank Account</Tab>
                </TabList>
                <TabPanels mt={2}>
                  <TabPanel px={0}>
                    <Stack spacing='5'>
                      <HostedFieldInput
                        id='card-number'
                        label='Card Number'
                        fieldState={hostedFieldsState?.fields.cardNumber}
                        rightElement={
                          <InputRightElement pointerEvents='none' p={2} w={14}>
                            <CreditCardBrandIcon
                              className='w-full'
                              brand={hostedFieldsState?.cardData?.brand}
                            />
                          </InputRightElement>
                        }
                      />
                      <HostedFieldInput
                        id='card-exp'
                        label='Exp'
                        fieldState={
                          hostedFieldsState?.fields.cardExpirationDate
                        }
                      />
                      <HostedFieldInput
                        id='card-cvv'
                        label='CVV'
                        fieldState={hostedFieldsState?.fields.cardSecurityCode}
                      />
                    </Stack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <Stack spacing='5'>
                      <HostedFieldInput
                        id='account-holder-name'
                        label='Account Name'
                        fieldState={hostedFieldsState?.fields.accountHolderName}
                      />
                      <HostedFieldInput
                        id='account-number'
                        label='Account Number'
                        fieldState={hostedFieldsState?.fields.accountNumber}
                      />
                      <HostedFieldInput
                        id='routing-number'
                        label='Routing Number'
                        fieldState={hostedFieldsState?.fields.routingNumber}
                      />
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <HStack justify='space-between'>
                <Checkbox>Store payment method</Checkbox>
              </HStack>
              <Stack spacing='6'>
                <Button colorScheme='blue' type='submit' variant='solid'>
                  Run payment
                </Button>
              </Stack>
            </Stack>
          </form>
          {loading && (
            <div className='absolute inset-0 flex items-center justify-center bg-opacity-30 bg-slate-500'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </div>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<{
  paymentToken: string;
}> = async ({ req }) => {
  const { session } = req as any;

  // grab the Gravity Legal Firm Token
  // from the current authenticated user
  const firmToken = session.user!.firm.glApiToken as string;

  // start a payment session
  const paymentToken = await startPaymentSession({ firmToken });

  return {
    props: {
      paymentToken,
    },
  };
};

export default CollectMoneyPage;
