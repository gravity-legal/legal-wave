import { ConnectionOptionsSplash } from '@/components/home/ConnectionOptionsSplash';
import { GravityLegalConnectionStatus } from '@/components/home/GravityLegalConnectStatus';
import PaymentVehicleSplash from '@/components/home/PaymentVehiclesSplash';
import { Layout } from '@/components/layout/Layout';
import { useSession } from '@/components/layout/SessionProvider';
import { Container } from '@chakra-ui/react';

export default function Home() {
  const session = useSession();
  const { firm } = session;

  return (
    <Layout>
      <Container py='8' height='full'>
        {!firm?.glApiToken && <ConnectionOptionsSplash />}
        {firm?.glApiToken && <GravityLegalConnectionStatus />}
        {session.glFirm?.isAcceptingPayments && <PaymentVehicleSplash />}
      </Container>
    </Layout>
  );
}
