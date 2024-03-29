import { JitsiMeeting } from '@jitsi/react-sdk';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Meeting from '~/components/Meeting';
import { API_BASE_URL } from '~/constants';
import { getConfig } from '~/services/config';
import { meetingActionService } from '~/services/meetingActionService';
import { getUserJWT } from '~/services/userService';
import { useUser } from '~/stores/UserStore';

function ClassLivePage() {
    const [userConfigOverwriteState, setUserConfigOverwriteState] = useState({
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
    });

    const [adminInterfaceConfigOverwriteState, setInterfaceConfigOverwriteState] = useState({
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
    });

    const [meetingDataState, setMeetingDataState] = useState(null);
    const [userState, dispatchUserState] = useUser();
    const { classId } = useParams();
    const location = useLocation();
    const [userData, userDispatch] = useUser();

    const [userInfoState, setUserInfoState] = useState({
        email: userState.email,
        displayName: userState.fullname,
        moderator: false,
        avatarUrl: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/assassins-creed-5/0/06/ACUnity_CoverThumb.jpg',
    });

    useEffect(() => {
        const config = getConfig();
        fetch(`${API_BASE_URL}/api/meeting?classId=${classId}`, config)
            .then((res) => res.json())
            .then((data) => {
                setMeetingDataState(data);
            });
    }, [location]);

    const postData = (action = 'join') => {
        const obj = {
            classId: classId,
            action: action,
        };
        meetingActionService.post(obj).then((data) => {});
    };

    useEffect(() => {
        if (userData && meetingDataState && userData.id && meetingDataState.id) {
            postData();
        }
    }, [userData, meetingDataState]);

    useEffect(() => {
        const alertUser = (e) => {
            e.preventDefault();
            postData('leave');
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', alertUser);
        return () => {
            window.removeEventListener('beforeunload', alertUser);
        };
    }, [meetingDataState]);

    useEffect(() => {
        return () => {
            postData('leave');
        };
    }, [location]);

    return (
        <div>
            {meetingDataState !== null && (
                <div>
                    <Meeting
                        configOverwrite={userConfigOverwriteState}
                        userInfo={userInfoState}
                        roomName={meetingDataState.url}
                        interfaceConfigOverwrite={adminInterfaceConfigOverwriteState}
                        getIFrameRef={(node) => (node.style.height = '800px')}
                    />
                </div>
            )}
        </div>
    );
}

export default ClassLivePage;

/*
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
*/
