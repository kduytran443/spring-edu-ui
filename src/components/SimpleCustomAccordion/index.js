import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate, useParams } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function SimpleCustomAccordion({ name, children }) {
    const { classId } = useParams();

    const [openState, setOpenState] = React.useState(true);

    return (
        <div className="my-2 bg-slate-100">
            <Accordion expanded={openState} sx={{ backgroundColor: '#f7f7f7' }}>
                <AccordionSummary
                    onClick={(e) => {
                        setOpenState(!openState);
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        <div className="font-bold text-xl">{name}</div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>{children}</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
