import SidebarMenu from '~/components/SidebarMenu';
import Header from '../components/Header';

function FullLayout({ children }) {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <Header />
            <div className="flex flex-row items-stretch flex-1">
                <div className="w-[96px] md:flex flex-col hidden">
                    <div className="flex-1">
                        <SidebarMenu />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default FullLayout;
