import { Avatar, Badge } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import HeaderAccountOptions from '../HeaderAccountOptions';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeaderNotifierBox from '../HeaderNotifierBox';

function HeaderNotifier() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <Tippy
            content="Tooltip"
            visible={visible}
            onClickOutside={hide}
            render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                    <HeaderNotifierBox/>
                </div>
            )}
            interactive
        >
            <div
                onClick={(e) => {
                    setVisible(!visible);
                }}
                className={`cursor-pointer ${visible && ' outline outline-4 shadow-md outline-sky-500 rounded-full'}`}
            >
                <Badge badgeContent={4} color="primary">
                    <NotificationsNoneIcon color="action" />
                </Badge>
            </div>
        </Tippy>
    );
}

export default HeaderNotifier;
