import { Avatar } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import HeaderAccountOptions from '../HeaderAccountOptions';

function HeaderAvatar({ image, username }) {
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
                    <HeaderAccountOptions />
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
                <Avatar sx={{ width: 44, height: 44 }} src={image} />
            </div>
        </Tippy>
    );
}

export default HeaderAvatar;
