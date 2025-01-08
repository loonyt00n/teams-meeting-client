import { CommunicationIdentityClient } from '@azure/communication-identity';
import { useEffect, useState } from 'react';

export const useACSClient = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const endpoint = process.env.REACT_APP_ACS_ENDPOINT; 
        const accessKey = process.env.REACT_APP_ACS_ACCESS_KEY; 
        const connectionString = `endpoint=${endpoint};accesskey=${accessKey}`;

        //console.log('Connection String:', connectionString); 

        const identityClient = new CommunicationIdentityClient(connectionString);
        const tokenResponse = await identityClient.createUserAndToken(['chat', 'voip']);

        //explicitly pass the endpoint back as it is needed by the adapter
        tokenResponse.endpoint = endpoint;

        console.log('Token Response:', tokenResponse);

        setToken(tokenResponse);
      } catch (err) {
        console.error('Error fetching token:', err); // Log the error
        setError(err);
      }
    };

    fetchToken();
  }, []);

  return { token, error };
};
