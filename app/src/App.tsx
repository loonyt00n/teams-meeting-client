import React, { useMemo, useEffect } from "react";
import { TeamsMeetingLinkLocator } from "@azure/communication-calling";
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import {
  CallAndChatLocator,
  CallWithChatComposite,
  useAzureCommunicationCallWithChatAdapter,
  CallWithChatCompositeOptions,
} from "@azure/communication-react";
import { Theme, PartialTheme, Spinner } from "@fluentui/react";

/**
 * Authentication information needed for your client application to use
 * Azure Communication Services.
 *
 * For this quickstart, you can obtain these from the Azure portal as described here:
 * https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/identity/quick-create-identity
 *
 * In a real application, your backend service would provide these to the client
 * application after the user goes through your authentication flow.
 */
// const ENDPOINT_URL = process.env.ENDPOINT_URL;
// const USER_ID = process.env.USER_ID;
// const TOKEN = process.env.TOKEN;
// const TEAMS_MEETING_LINK = process.env.TEAMS_MEETING_LINK;

const ENDPOINT_URL = "https://raghu-communicationservices.india.communication.azure.com";
const USER_ID = "8:acs:e8d5d38f-75e9-471d-8433-6b17c8054bd3_00000024-ec6c-855a-ec78-c93a0d005220";
const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3Qjg2NEUwQjM0QUQ0RDQyRTM3OTRBRTAyNTAwRDVBNTE5MjA1RjUiLCJ4NXQiOiJWN2hrNExOSzFOUXVONVN1QWxBTldsR1NCZlUiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmU4ZDVkMzhmLTc1ZTktNDcxZC04NDMzLTZiMTdjODA1NGJkM18wMDAwMDAyNC1lYzZjLTg1NWEtZWM3OC1jOTNhMGQwMDUyMjAiLCJzY3AiOjE3OTIsImNzaSI6IjE3MzY0NTA5NTciLCJleHAiOjE3MzY1MzczNTcsInJnbiI6ImluIiwiYWNzU2NvcGUiOiJjaGF0LHZvaXAiLCJyZXNvdXJjZUlkIjoiZThkNWQzOGYtNzVlOS00NzFkLTg0MzMtNmIxN2M4MDU0YmQzIiwicmVzb3VyY2VMb2NhdGlvbiI6ImluZGlhIiwiaWF0IjoxNzM2NDUwOTU3fQ.Rfr0EPDMHgfziWzyQRMFWq4FQnS4CiwBUf5tsjfaIcgD5V8itJrtyJwlIc8EgYwbz1x5VjjGHwmTQ5gsbUUylOo4acYY0e3nzP9wPPkclvpgYO0EPCSRpNlGC2qAP5rZR1DKpUTNVqbv-xPywFKhazBHDuB_Lh_W0QWe8xjgi4nxrUMDgnVc7uQwI_2cw9wvcly7DRGkzf7l-3-PqunNeLPSTChODMIrYRkyIHYtMuvk8DvzYjFIHTS4TjC0E5QcNFPgEbI9ihrR4iCS_mWY8V8WZ6tWc4VJ3ap3otp0_VEr4Cw7ZxdT9TJB6p4lTmYWdnXE6zAQh-ObJC6eWFPd1A";
const TEAMS_MEETING_LINK = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWNjYjRkYTQtOWRkYi00NGVlLTg3NWItYjlkM2Q2Y2FhZTdj%40thread.v2/0?context=%7b%22Tid%22%3a%2273a4c997-ac5a-4bcd-81f3-fd25589a48b7%22%2c%22Oid%22%3a%22d752b312-a216-413c-ac0b-015cbbbd950d%22%7d";

/**
 * Display name for the local participant.
 * In a real application, this would be part of the user data that your
 * backend services provides to the client application after the user
 * goes through your authentication flow.
 */
const DISPLAY_NAME = "User";
/**
 * By default, the `richTextEditorEnabled` is set to false,
 * which means the plain text editor will be used for the SendBox component and the MessageThread component's edit function.
 * Change this value to true to use the Rich Text Editor instead,
 * which provides rich text formatting, table inserting etc.
 */
const richTextEditorEnabled = true;


export type CallWithChatExampleProps = {
  // Props needed for the construction of the CallWithChatAdapter
  userId: CommunicationUserIdentifier;
  token: string;
  displayName: string;
  endpointUrl: string;
  locator: TeamsMeetingLinkLocator | CallAndChatLocator;

  // Props to customize the CallWithChatComposite experience
  fluentTheme?: PartialTheme | Theme;
  compositeOptions?: CallWithChatCompositeOptions;
  callInvitationURL?: string;
};

export const CallWithChatExperience = (
  props: CallWithChatExampleProps
): JSX.Element => {

  // Construct a credential for the user with the token retrieved from your server. This credential
  // must be memoized to ensure useAzureCommunicationCallWithChatAdapter is not retriggered on every render pass.
  const credential = useMemo(
    () => new AzureCommunicationTokenCredential(props.token),
    [props.token]
  );

  // Create the adapter using a custom react hook provided in the @azure/communication-react package.
  // See https://aka.ms/acsstorybook?path=/docs/composite-adapters--page for more information on adapter construction and alternative constructors.
  const adapter = useAzureCommunicationCallWithChatAdapter({
    userId: props.userId,
    displayName: props.displayName,
    credential,
    locator: props.locator,
    endpoint: props.endpointUrl,
  });

  if (!USER_ID || !TOKEN || !ENDPOINT_URL || !TEAMS_MEETING_LINK) {
    return <Spinner label="Authenticating..." />;
  }

  // The adapter is created asynchronously by the useAzureCommunicationCallWithChatAdapter hook.
  // Here we show a spinner until the adapter has finished constructing.
  if (!adapter) {
    return <Spinner label="Initializing..." />;
  }

  return (
    <CallWithChatComposite
      adapter={adapter}
      fluentTheme={props.fluentTheme}
      options={props.compositeOptions}
      formFactor="mobile"
    />
  );
};


/**
 * Entry point of your application.
 */
function App(): JSX.Element {
  useEffect(() => {
    const handleResizeObserverLoopError = () => { // Catch and handle ResizeObserver loop errors 
      console.error("ResizeObserver loop error");
    }; 
    window.addEventListener("error", handleResizeObserverLoopError); 
    return () => { window.removeEventListener("error", handleResizeObserverLoopError); };
  }, []);

  return (
    <CallWithChatExperience
      userId={{ communicationUserId: USER_ID }}
      token={TOKEN}
      displayName={DISPLAY_NAME}
      endpointUrl={ENDPOINT_URL}
      locator={{ meetingLink: TEAMS_MEETING_LINK }}
      compositeOptions={{ richTextEditor: richTextEditorEnabled }}
    />
  );
}

export default App;
