import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children?: any }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as='section'
      direction={{ base: 'column', lg: 'row' }}
      height='100vh'
      bg='bg-canvas'
      overflowY='auto'
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <Box bg='bg-surface' pt={{ base: '0', lg: '3' }} flex='1'>
        <Box
          bg='bg-canvas'
          borderTopLeftRadius={{ base: 'none', lg: '2rem' }}
          height='full'
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
