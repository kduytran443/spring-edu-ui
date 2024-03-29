import './App.css';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useLocation,
    unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { publicRoutes, privateRoutes, adminRoutes } from './routes';
import FullLayout from './layouts/FullLayout';
import { Fragment, useEffect, useState } from 'react';
import { authorize, getUserInfo } from './services/userService';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScrollToTop from './components/ScrollToTop';
import { HOME_PAGE_URL } from './constants';
import NotFoundPage from './pages/NotFoundPage';
import { setUserInfo, useUser } from './stores/UserStore';

const theme = createTheme({
    typography: {
        fontFamily: ['Manrope', 'sans-serif'].join(','),
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                },
            },
        },
        button: {
            fontFamily: ['Manrope', 'sans-serif'].join(','),
            fontSize: 16,
            fontWeight: 400,
        },
    },
});
export const history = createBrowserHistory();

function App() {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);
    const [userState, dispatchUserState] = useUser();

    useEffect(() => {
        const doFetch = async () => {
            const getUser = getUserInfo();
            getUser.then((data) => {
                if (data && !data.error) {
                    dispatchUserState(setUserInfo(data));
                }
            });
        };
        doFetch();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <HistoryRouter history={history}>
                <div className="pd-0 ">
                    <ScrollToTop>
                        <Routes>
                            {publicRoutes.map((publicRoute, index) => {
                                const Page = publicRoute.component;

                                let Layout = FullLayout;
                                if (publicRoute.layout) {
                                    Layout = publicRoute.layout;
                                } else if (publicRoute.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={publicRoute.path}
                                        path={publicRoute.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                            {privateRoutes.map((privateRoute) => {
                                const Page = privateRoute.component;

                                let Layout = FullLayout;
                                if (privateRoute.layout) {
                                    Layout = privateRoute.layout;
                                } else if (privateRoute.layout === null) {
                                    Layout = Fragment;
                                }

                                const isAuthenticated = authorize();
                                return (
                                    <Route
                                        key={privateRoute.path}
                                        path={privateRoute.path}
                                        element={
                                            isAuthenticatedState === false ? (
                                                <Navigate to={HOME_PAGE_URL} />
                                            ) : (
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            )
                                        }
                                    />
                                );
                            })}
                            {adminRoutes.map((route, index) => {
                                const Page = route.component;

                                let Layout = FullLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </ScrollToTop>
                </div>
            </HistoryRouter>
        </ThemeProvider>
    );
}

export default App;
