import {
    faCalendar,
    faClock,
    faEye,
    faHand,
    faPercent,
    faPlus,
    faRightFromBracket,
    faRightToBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { noteFolderService } from '~/services/noteFolderService';
import { questionBankService } from '~/services/questionBankService';
import { renderToDate, renderToJustHoursMinutesSeconds, renderToTime } from '~/utils';

export default function CalendarHistoryDialog({
    historyList = [],
    total,
    progress,
    date,
    username,
    fullname,
    avatar,
    classId,
}) {
    const [open, setOpen] = useState(false);
    const [historyListState, setHistoryListState] = useState([]);

    useEffect(() => {
        const arr = [...historyList];
        arr.sort((a, b) => {
            if (a.time < b.time) {
                return 1;
            }
            if (a.time > b.time) {
                return -1;
            }
            return 0;
        });
        setHistoryListState(arr);
    }, [historyList]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [noteFolderName, setNoteFolderName] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setNoteFolderName('');
    }, [open]);

    return (
        <div>
            <div onClick={handleClickOpen}>
                <Button size="small" startIcon={<FontAwesomeIcon icon={faEye} />}>
                    Xem chi tiết
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chi tiết lịch sử</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="mt-4 w-[240px] md:w-[400px]">
                            <div className="mb-4">
                                <div>
                                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Username: {username}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Ngày: {renderToDate(date)}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faHand} className="mr-2" /> Số thao tác:{' '}
                                    {historyListState.length}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faClock} className="mr-2" /> Tổng thời gian: {total}
                                </div>
                                <div className={progress >= 50 ? 'text-blue-500' : 'text-red-500'}>
                                    <FontAwesomeIcon icon={faPercent} className="mr-2" />
                                    {`${Math.round(progress)}%`}
                                </div>
                            </div>
                            <ul className="w-full flex flex-col">
                                {historyListState.map((item, index) => {
                                    return (
                                        <li
                                            className="w-full flex-row mt-2 flex items-center justify-between"
                                            key={index}
                                        >
                                            <div>{renderToJustHoursMinutesSeconds(item.time)}</div>
                                            <div>
                                                {item.action === 'join' ? (
                                                    <div className="text-blue-500">
                                                        Vào <FontAwesomeIcon className="ml-2" icon={faRightToBracket} />
                                                    </div>
                                                ) : (
                                                    <div className="text-red-500">
                                                        Ra{' '}
                                                        <FontAwesomeIcon className="ml-2" icon={faRightFromBracket} />
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
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
