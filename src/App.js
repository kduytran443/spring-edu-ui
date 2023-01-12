import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import FullLayout from './layouts/FullLayout';
import { Fragment } from 'react';
import { authorize } from './services/userService';

function App() {
    return (
        <Router>
            <div className="pd-0 ">
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
                                    isAuthenticated ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/home" />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
