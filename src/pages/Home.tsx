import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { ChatkitProvider, TokenProvider, withChatkit } from '@pusher/chatkit-client-react';
import Chat from '../chat/Chat';

const instanceLocator = 'v1:us1:4a1d632e-8719-414e-947c-81b0352f1f52';
const userId = 'Alice'; // todo: In a real application this would be loaded from your authentication system

const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4a1d632e-8719-414e-947c-81b0352f1f52/token' // todo: Test token, needs to generate real token somehow in prod
});

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ChatkitProvider 
          instanceLocator={instanceLocator}
          tokenProvider={tokenProvider}
          userId={userId}
        >
          <Chat otherUserId={'Bob'}/>
        </ChatkitProvider>
      </IonContent>
    </IonPage>
  );
};

const WelcomeMessage = withChatkit(props => {
  return (
    <div>
      {props.chatkit.isLoading 
      ? 'Connecting to Chatkit...'
      : `Hello ${props.chatkit.currentUser.name}!`}
    </div>
  )
})

export default Home;
