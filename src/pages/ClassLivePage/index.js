import { JitsiMeeting } from '@jitsi/react-sdk';
import { useState } from 'react';

const domain = 'meet.jit.si';
const options = {
    roomName: 'testthuwebsite123',
    parentNode: document.querySelector('#meet'),
    lang: 'en',
    configOverwrite: {
        requireDisplayName: false,
        prejoinPageEnabled: false,
        startWithAudioMuted: true,
        enableLobbyChat: true,
        remoteVideoMenu: { disableKick: true, disableStopVideo: true, disabled: true },
        prejoinPageEnabled: false,
        subject: 'Meeting',
        disableRemoteMute: true,
        disableRemoteVideo: true,
        startWithVideoMuted: true,
        startWithAudioMuted: true,
        disableShortcuts: true,
        enableWelcomePage: false,
        enableClosePage: true,
    },
    disableShowMoreStats: true,

    avatarUrl:
        'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2022-12/Lionel%20Messi%20Argentina%20kiss%20World%20Cup%20trophy%20121822.jpg?itok=tKsCqx9f',
    userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'Khánh duy',
        moderator: false,
        avatarUrl:
            'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2022-12/Lionel%20Messi%20Argentina%20kiss%20World%20Cup%20trophy%20121822.jpg?itok=tKsCqx9f',
    },
    interfaceConfigOverwrite: {
        MOBILE_APP_PROMO: false, // don't works
        DEFAULT_LOCAL_DISPLAY_NAME: 'Eu', //ok
        SHOW_CHROME_EXTENSION_BANNER: false, //ok
        TOOLBAR_ALWAYS_VISIBLE: true, // ok
        SETTINGS_SECTIONS: ['devices', 'language'], //ok,
        TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'closedcaptions',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'hangup',
            'profile',
            'chat',
            'recording',
            'etherpad',
            'sharedvideo',
            'settings',
            'raisehand',
            'videoquality',
            'filmstrip',
            'feedback',
            'stats',
            'shortcuts',
            'tileview',
        ], // ok
    },
};
const adminOptions = {
    roomName: 'testthuwebsite123',
    parentNode: document.querySelector('#meet'),
    lang: 'en',
    avatarUrl:
        'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2022-12/Lionel%20Messi%20Argentina%20kiss%20World%20Cup%20trophy%20121822.jpg?itok=tKsCqx9f',
    userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'Khánh duy',
        moderator: false,
        avatarUrl:
            'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2022-12/Lionel%20Messi%20Argentina%20kiss%20World%20Cup%20trophy%20121822.jpg?itok=tKsCqx9f',
    },
    configOverwrite: {
        requireDisplayName: false,
        prejoinPageEnabled: false,
        startWithAudioMuted: true,
        enableLobbyChat: true,
        prejoinPageEnabled: false,
        subject: 'Meeting',
        startWithVideoMuted: true,
        startWithAudioMuted: true,
        disableShortcuts: true,
        enableWelcomePage: false,
        enableClosePage: true,
    },
};

function ClassLivePage() {
    const [userConfigOverwriteState, setUserConfigOverwriteState] = useState(() => {
        return {
            requireDisplayName: false,
            prejoinPageEnabled: false,
            startWithAudioMuted: true,
            enableLobbyChat: true,
            prejoinPageEnabled: false,
            subject: 'Meeting',
            startWithVideoMuted: true,
            startWithAudioMuted: true,
            disableShortcuts: true,
            enableWelcomePage: false,
            enableClosePage: true,
        };
    });
    const [interfaceConfigOverwriteState, setInterfaceConfigOverwriteState] = useState(() => {
        return {
            MOBILE_APP_PROMO: false, // don't works
            DEFAULT_LOCAL_DISPLAY_NAME: 'Eu', //ok
            SHOW_CHROME_EXTENSION_BANNER: false, //ok
            TOOLBAR_ALWAYS_VISIBLE: true, // ok
            SETTINGS_SECTIONS: ['devices', 'language'], //ok,
            TOOLBAR_BUTTONS: [
                'microphone',
                'camera',
                'closedcaptions',
                'desktop',
                'fullscreen',
                'fodeviceselection',
                'hangup',
                'profile',
                'chat',
                'recording',
                'etherpad',
                'sharedvideo',
                'settings',
                'raisehand',
                'videoquality',
                'filmstrip',
                'feedback',
                'stats',
                'shortcuts',
                'tileview',
            ], // ok
        };
    });

    const [roomNameState, setRoomNameState] = useState('dai_hoc_can_tho_test_luan_van');
    const [userInfoState, setUserInfoState] = useState(() => {
        return {
            email: 'email@jitsiexamplemail.com',
            displayName: 'Khánh duy',
            moderator: false,
            avatarUrl:
                'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2022-12/Lionel%20Messi%20Argentina%20kiss%20World%20Cup%20trophy%20121822.jpg?itok=tKsCqx9f',
        };
    });

    return (
        <div>
            <JitsiMeeting
                configOverwrite={userConfigOverwriteState}
                userInfo={userInfoState}
                roomName={roomNameState}
                interfaceConfigOverwrite={interfaceConfigOverwriteState}
                getIFrameRef={(node) => (node.style.height = '800px')}
            />
        </div>
    );
}

export default ClassLivePage;
