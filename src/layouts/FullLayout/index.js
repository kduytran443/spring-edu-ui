import Header from '../components/Header';

function FullLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default FullLayout;
