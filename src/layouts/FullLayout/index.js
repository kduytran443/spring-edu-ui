import SidebarMenu from '~/components/SidebarMenu';
import Header from '../components/Header';
import SimpleFooter from '../components/SimpleFooter';

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
                {children}
            </div>
            <SimpleFooter />
        </div>
    );
}

export default FullLayout;
