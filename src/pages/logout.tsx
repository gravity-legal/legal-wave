import Cookies from 'cookies';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  cookies.set('wave:userId');

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default function LogoutPage() {
  return null;
}
