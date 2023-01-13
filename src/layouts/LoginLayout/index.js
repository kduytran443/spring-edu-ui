import Logo from '~/components/Logo';

function LoginLayout({ children }) {
    return (
        <div className="bg-slate-100 min-h-screen flex flex-col justify-between items-center">
            <div className="flex flex-col items-center sm:flex-row flex-1 w-full justify-around flex-wrap">
                <div className="w-full max-w-[240px] sm:max-w-[320px]">
                    <Logo />
                </div>
                {children}
            </div>
            <div>Footer</div>
        </div>
    );
}

export default LoginLayout;
