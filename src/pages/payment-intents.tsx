import { Layout } from '@/components/layout/Layout';
import { startPaymentSession } from '@/gravity-legal-requests/startPaymentSession';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { CreditCardBrandIcon } from '@/components/credit-cards/CreditCardBrandIcon';
import { useGravityLegal } from '@/components/hooks/useGravityLegal';
import HostedFieldInput from '@/components/HostedFieldInput';
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
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import currency from 'currency.js';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCheckCircle } from 'react-icons/md';

interface FormData {
  amount: string;
  email: string;
}

interface PaymentResult {
  amountProcessed: number;
  status: 'success' | 'partial_success' | 'failure';
}

export const PaymentIntentPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ paymentToken }) => {
  return (
    <Layout>
      <Container py={{ base: '16', md: '24' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
          <Stack spacing={{ base: '4', md: '6' }}>
            <Stack spacing='4'>
              <Heading as='h1' size={{ base: 'md', md: 'lg' }}>
                Payment Intents
              </Heading>
            </Stack>
            <Text textStyle={{ base: 'lg', md: 'xl' }} color='fg.muted'>
              Payment Intents are the simplest way to collect money. Make a
              payment using the form.
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Create a payment session from your server
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Initialize the Hosted Fields SDK
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Pass the returned payment token to your server and finish the
                payment.
              </ListItem>
            </List>
          </Stack>
          <PaymentForm paymentToken={paymentToken} />
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export interface PaymentFormProps {
  paymentToken: string;
}

const PaymentForm: FC<PaymentFormProps> = ({ paymentToken }) => {
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
  return (
    <Stack spacing={{ base: '8', lg: '6' }} height='full'>
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

      {result && (
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'white' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          position='relative'
          width='lg'
        >
          <Stack spacing='6' textAlign='center'>
            <Heading>Success!</Heading>
            <Button variant='link' onClick={() => router.reload()}>
              Collect more
            </Button>
          </Stack>
        </Box>
      )}

      {!result && (
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'white' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          position='relative'
          width='lg'
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
      )}
    </Stack>
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

export default PaymentIntentPage;
