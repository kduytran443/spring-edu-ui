import Logo from '~/components/Logo';
import SimpleFooter from '../components/SimpleFooter';

function LoginLayout({ children }) {
    return (
        <div className="bg-slate-100 min-h-screen flex flex-col justify-between items-center pt-10">
            <div className="flex flex-col items-center sm:flex-row flex-1 w-full justify-around flex-wrap">
                <div className="w-full max-w-[200px] sm:max-w-[320px] my-8">
                    <Logo />
                </div>
                {children}
            </div>
            <div>
                <SimpleFooter />
            </div>
        </div>
    );
}

export default LoginLayout;
