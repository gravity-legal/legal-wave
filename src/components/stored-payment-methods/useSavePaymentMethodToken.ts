import { useEffect, useState } from 'react';

export interface UseSavePaymentMethodTokenHook {
  error: any | undefined;
  loading: boolean;
  token: string | undefined;
}

export const useSavePaymentMethodToken = (): UseSavePaymentMethodTokenHook => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();
  const [error, setError] = useState();

  const fetchAndSaveToken = async () => {
    const result = await fetch('/api/stored-payment-methods/create-token');
    const json = await result.json();
    setToken(json.token);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndSaveToken();
  }, []);

  return {
    error,
    loading,
    token,
  };
};
