import FullLayout from '../FullLayout';
import { Alert, AlertTitle, Breadcrumbs, Button, Divider, Typography } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ClassTopic from '~/components/ClassTopic';
import SimpleAccordion from '~/components/SimpleAccordion';
import { useLayoutEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function ClassLayout({ children }) {
    const { classId } = useParams();
    const location = useLocation();

    const [allTabsState, setAllTabsState] = useState([
        {
            id: 1,
            name: 'Bảng tin',
            path: '',
        },
        {
            id: 2,
            name: 'Bài tập trên lớp',
            path: '/exercise',
        },
        {
            id: 3,
            name: 'Mọi người',
            path: '/everyone',
        },
        {
            id: 4,
            name: 'Điểm',
            path: '/mark',
        },
        {
            id: 5,
            name: 'Live',
            path: '/live',
        },
        {
            id: 6,
            name: 'Nhắn tin',
            path: '/setting',
        },
        {
            id: 7,
            name: 'Cài đặt',
            path: '/setting',
        },
    ]);

    const navigate = useNavigate();
    const navigateOtherTab = (path) => {
        navigate('/class/' + classId + path);
    };

    const [value, setValue] = useState(1);

    useLayoutEffect(() => {
        let selectedTab;
        for (let i = 0; i < allTabsState.length; i++) {
            let tab = allTabsState[i];
            if (location.pathname.includes(tab.path)) {
                selectedTab = tab;
            }
        }
        setValue(selectedTab.id);
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <FullLayout>
            <div className="w-full">
                <div className="my-2 pl-4">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            MUI
                        </Link>
                        <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                            Core
                        </Link>
                        <Typography color="text.primary">Breadcrumbs</Typography>
                    </Breadcrumbs>
                </div>
                <div
                    className={`relative bg-center bg-cover overflow-hidden md:rounded-lg px-4 py-20`}
                    style={{
                        backgroundImage: `url(${'https://www.gstatic.com/classroom/themes/img_graduation.jpg'})`,
                    }}
                >
                    <div className="font-black text-4xl my-2 text-white">Lớp học Spring Boot</div>
                </div>
                <div className="max-w-full w-full overflow-x-scroll">
                    <div className="w-[620px] py-2 md:py-0 md:w-full">
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        {allTabsState.map((tab) => {
                                            return (
                                                <Tab
                                                    onClick={(e) => navigateOtherTab(tab.path)}
                                                    label={tab.name}
                                                    value={tab.id}
                                                    key={tab.id}
                                                />
                                            );
                                        })}
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                    </div>
                </div>
                <div className="w-full">{children}</div>
            </div>
        </FullLayout>
    );
}

export default ClassLayout;
