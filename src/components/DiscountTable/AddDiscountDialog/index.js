import { faEdit, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { discountService } from '~/services/discountService';
import { topicService } from '~/services/topicService';

function AddDiscountDialog({ classId, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const [error, setError] = useState();

    const [discount, setDiscount] = useState();
    const [alertSuccess, setAlertSuccess] = useState(0);

    useEffect(() => {
        setDiscount({
            startDate: new Date(),
            endDate: new Date(),
            discountPercent: 0,
            classId: classId,
        });
        setError(false);
    }, [open]);

    console.log('discount', discount);

    const changeStartDate = (value) => {
        setError(false);
        setDiscount((pre) => {
            return { ...pre, startDate: value };
        });
    };

    const changeEndDate = (value) => {
        setError(false);
        setDiscount((pre) => {
            return { ...pre, endDate: value };
        });
    };

    const check = () => {
        let valid = true;

        if (discount.discountPercent <= 0) {
            valid = false;
        }

        if (discount.startDate >= discount.endDate) {
            valid = false;
        }

        return valid;
    };

    const submit = () => {
        if (check()) {
            discountService.post(discount).then((data) => {
                if (data.id) {
                    setAlertSuccess(1);
                    setTimeout(() => {
                        reload();
                        setAlertSuccess(0);
                        handleClose();
                    }, 1000);
                } else {
                    setAlertSuccess(-1);
                    setTimeout(() => {
                        setAlertSuccess(0);
                    }, 1000);
                }
            });
        } else {
            setError(true);
        }
    };

    return (
        <div className="w-full">
            <Button onClick={handleClickOpen} size="small" startIcon={<FontAwesomeIcon icon={faPlus} />}>
                Thêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cập nhật giảm giá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {discount && (
                            <div className="lg:w-[500px] my-2 w-[320px] min-h-[240px] flex flex-col">
                                <AlertSuccessDialog open={alertSuccess === 1} />
                                <AlertFailDialog open={alertSuccess === -1} />
                                <TextField
                                    value={discount.discountPercent}
                                    type={'number'}
                                    onInput={(e) => {
                                        setError(false);
                                        setDiscount((pre) => {
                                            return { ...pre, discountPercent: e.target.value };
                                        });
                                    }}
                                    label="Tên chủ đề"
                                />
                                <div className="flex flex-col items-center w-full">
                                    {discount.startDate && (
                                        <div className="z-[40] w-full">
                                            <div className="font-bold">Bắt đầu:</div>
                                            <DateTimePicker
                                                className="h-[40px] w-full md:w-auto"
                                                onChange={(e) => {
                                                    changeStartDate(new Date(e.getTime()));
                                                }}
                                                value={new Date(discount.startDate)}
                                            />
                                        </div>
                                    )}
                                    {discount.endDate && (
                                        <div className="z-[40] w-full">
                                            <div className="font-bold">Kết thúc:</div>
                                            <DateTimePicker
                                                className="h-[40px] w-full md:w-auto"
                                                onChange={(e) => {
                                                    changeEndDate(new Date(e.getTime()));
                                                }}
                                                value={new Date(discount.endDate)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {error && <div className="text-red-500">*Thông tin nhập không chính xác, hãy nhập lại</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        disabled={discount && discount.discountPercent <= 0}
                        onClick={submit}
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddDiscountDialog;
