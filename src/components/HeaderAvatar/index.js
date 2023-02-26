import { Avatar } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import HeaderAccountOptions from '../HeaderAccountOptions';

function HeaderAvatar() {
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
                <Avatar
                    sx={{ width: 44, height: 44 }}
                    src={
                        'https://assets-global.website-files.com/62196607bf1b46c300301846/62196607bf1b4642e7301e28_5fb42ba3f6da8426682c53df_in%2520the%2520meeting%2520vs%2520at%2520the%2520meeting%2520grammar.jpeg'
                    }
                />
            </div>
        </Tippy>
    );
}

export default HeaderAvatar;
