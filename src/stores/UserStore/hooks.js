import { useContext } from 'react';
import Context from './Context';

export const useUser = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
};
