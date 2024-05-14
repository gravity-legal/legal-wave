import {
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import LazyContent from '../ui/LazyContent';

export interface OnboardingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingFormModal: FC<OnboardingFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      const result = await fetch('/api/onboarding/create-onboarding-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      const token = json.token;
      setToken(token);
    } catch (e) {}
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='full'>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container centerContent pt={12} pb={48}>
            <LazyContent>
              {() => <OnboardingFormRenderer token={token} />}
            </LazyContent>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export interface OnboardingFormRendererProps {
  token: string | null;
}

const OnboardingFormRenderer: FC<OnboardingFormRendererProps> = ({ token }) => {
  useEffect(() => {
    if (token) {
      window.confidoOnboarding.renderForm({
        containerId: 'confido-onboarding-form',
        token,
        disableOwnerInvite: true,
        onChange: (event) => console.log('change', event),
        style: {
          theme: {
            brandColors: {
              50: '#F0FFF4',
              100: '#C6F6D5',
              200: '#9AE6B4',
              300: '#68D391',
              400: '#48BB78',
              500: '#38A169',
              600: '#2F855A',
              700: '#276749',
              800: '#22543D',
              900: '#1C4532',
            },
          },
          inputBackgroundColor: '#fff',
        },
      });
    }
  }, [token]);

  return <div id='confido-onboarding-form' />;
};

export default OnboardingFormModal;
