import SidebarMenu from '~/components/SidebarMenu';
import Header from '../components/Header';
import SimpleFooter from '../components/SimpleFooter';
import BasicSpeedDial from '~/components/BasicSpeedDial';
import ChatSpeedDial from '~/components/ChatSpeedDial';
import NoteSpeedDial from '~/components/NoteSpeedDial';
import Draggable from 'react-draggable';

function FullLayout({ children }) {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <Header />
            <div className="flex flex-row items-stretch flex-1">
                <div className="w-[96px] md:flex flex-col hidden items-center">
                    <div className="flex-1 fixed">
                        <SidebarMenu />
                    </div>
                </div>
                <div className="flex flex-col max-w-full flex-1 w-full md:w-[calc(100%-96px)] p-0 md:p-6">
                    {children}
                </div>
                <div className="z-30">
                    <ChatSpeedDial />
                    <NoteSpeedDial />
                </div>
            </div>
            <SimpleFooter />
        </div>
    );
}

export default FullLayout;
