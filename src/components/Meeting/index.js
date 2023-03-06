import { JitsiMeeting } from '@jitsi/react-sdk';

function Meeting({ configOverwrite, userInfo, roomName, interfaceConfigOverwrite }) {
    return (
        <JitsiMeeting
            configOverwrite={configOverwrite}
            userInfo={userInfo}
            roomName={roomName}
            interfaceConfigOverwrite={interfaceConfigOverwrite}
            getIFrameRef={(node) => (node.style.height = '800px')}
        />
    );
}

export default Meeting;
