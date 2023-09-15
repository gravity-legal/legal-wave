import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react';

interface NavButtonProps extends ButtonProps {
  icon?: As;
  isActive?: boolean;
  label: string;
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, ...buttonProps } = props;
  return (
    <Button
      variant='ghost'
      justifyContent='start'
      w='full'
      isActive={props.isActive}
      _active={{ bg: 'blue.50' }}
      {...buttonProps}
    >
      <HStack spacing='3'>
        {icon && <Icon as={icon} boxSize='6' color='subtle' />}
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};
