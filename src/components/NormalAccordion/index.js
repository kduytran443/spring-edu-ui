import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function NormalAccordion({ name, children }) {
    const [openState, setOpenState] = React.useState(false);

    return (
        <div className="my-2">
            <Accordion expanded={openState}>
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
