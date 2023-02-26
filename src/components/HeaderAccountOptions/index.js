import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_PAGE_URL } from '~/constants';

function HeaderAccountOptions() {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-4 w-[200px] min-h-[100px] shadow-lg rounded-lg">
            <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding onClick={(e) => navigate(PERSONAL_PAGE_URL)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cá nhân" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Thoát" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </div>
    );
}

export default HeaderAccountOptions;
