import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
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

function App() {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);
    const [userState, dispatchUserState] = useUser();

    useEffect(() => {
        const login = authorize().then((data) => data);
        login.then((data) => {
            dispatchUserState(setUserInfo(data));
            setIsAuthenticatedState(data);
        });
    }, [isAuthenticatedState]);

    useEffect(() => {
        const doFetch = async () => {
            const getUser = getUserInfo();
            getUser.then((data) => {
                if (!data.error) {
                    console.log('userdata ???', data);
                    dispatchUserState(setUserInfo(data));
                }
            });
        };
        doFetch();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
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
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </ScrollToTop>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
