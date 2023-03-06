import { UserProvider } from './UserStore';

function Provider({ children }) {
    return <UserProvider>{children}</UserProvider>;
}

export default Provider;
