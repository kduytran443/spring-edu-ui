import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import PaypalCheckout from '../PaypalCheckout';
import { useEffect } from 'react';
export default function CheckoutDialog({
    userState = {},
    totalFee,
    paySuccessfully = () => {},
    classDataState = {},
    reload = () => {},
    clicked = false,
    setClicked = () => {},
}) {
    const [open, setOpen] = useState(clicked);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setClicked(false);
    };

    useEffect(() => {
        if (clicked) setOpen(true);
    }, [clicked]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thanh toán</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 w-full md:w-[500px]">
                            <PaypalCheckout
                                username={userState.username}
                                email={userState.email}
                                classFullName={classDataState.name}
                                dataId={classDataState.id}
                                phoneNumber={userState.phoneNumber}
                                payee={classDataState.paypalAccount}
                                totalPrice={totalFee}
                                successAction={paySuccessfully}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="select-none cursor-pointer" onClick={handleClose}>
                        <Button color="inherit">Đóng</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
