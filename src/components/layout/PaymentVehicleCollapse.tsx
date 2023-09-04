import {
  Box,
  Button,
  Collapse,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiChevronDown, FiFile } from 'react-icons/fi';
import { NavButton } from './NavButton';

export const PaymentVehicleCollapse = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Button
        onClick={onToggle}
        variant='ghost'
        justifyContent='space-between'
        width='full'
      >
        <HStack spacing='3'>
          <Icon as={FiFile} boxSize='6' color='subtle' />
          <Text>Payment Vehicles</Text>
        </HStack>
        <PopoverIcon isOpen={isOpen} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing='1' alignItems='stretch' ps='8' py='1'>
          {[
            'Payment Intents',
            'Payment Links',
            'Aggregate Payment Links',
            'Stored Payment Methods',
            'Subscriptions',
          ].map((item) => (
            <NavButton key={item} label={item} />
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  };
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />;
};
