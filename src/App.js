import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { CallWithChatComposite, FluentThemeProvider, useAzureCommunicationCallWithChatAdapter } from '@azure/communication-react';
import { useACSClient } from './useACSClient';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const App = () => {
    const { token, error } = useACSClient();
    const query = useQuery();
    const meetingId = query.get('meetingId');
    const displayName = query.get('displayName') || 'Anonymous';

    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        if (meetingId && !/^[0-9]{12}$/.test(meetingId)) {
            setValidationError('Invalid meeting ID format. Should be a 12 digit number with no spaces.');
            return;
        }

        if (displayName.length > 100) {
            setValidationError('Display name is too long.');
            return;
        }
    }, [meetingId, displayName]);

    const adapter = useAzureCommunicationCallWithChatAdapter({
        userId: token ? token.user : undefined,
        endpoint: token ? token.endpoint : undefined,
        displayName,
        credential: token ? new AzureCommunicationTokenCredential(token.token) : undefined,
        locator: { groupId: meetingId }
    });

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (validationError) {
        return <p>Error: {validationError}</p>;
    }

    if (!adapter) {
        return <p>Loading...</p>;
    }

    return (
        <FluentThemeProvider>
            <CallWithChatComposite adapter={adapter} formFactor='desktop' />
        </FluentThemeProvider>
    );
};

export default App;
