import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, TextField } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import AlertDialogSlide from '../AlertDialogSlide';

export default function CalendarItem({
    data = {
        id: 0,
        title: 'Tiêu đề',
        description: 'Mô tả',
        start: new Date(),
        end: new Date(),
        img: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    },
    onRemove = () => {},
    onUpdate = () => {},
    setData = () => {},
    close = () => {},
}) {
    const [enableEditingState, setEnableEditingState] = useState(false);
    const [removeAlertState, setRemoveAlertState] = useState(false);
    const [dataState, setDataState] = useState(data);

    if (!dataState.img) {
        dataState.img = 'https://mui.com/static/images/cards/contemplative-reptile.jpg';
    }

    const startEditing = () => {
        setEnableEditingState(true);
    };

    useEffect(() => {
        setEnableEditingState(false);
    }, [data.id]);

    useEffect(() => {
        setDataState(data);
    }, [data]);

    const remove = () => {
        onRemove();
    };

    const showRemoveAlert = () => {
        setRemoveAlertState(true);
    };

    const hideRemoveAlert = () => {
        setRemoveAlertState(false);
    };

    const submitUpdate = () => {
        onUpdate(dataState);
    };
    const cancelUpdate = () => {
        setDataState(data);
    };

    return (
        <Card className="relative w-full h-full flex flex-col">
            <div className="absolute top-0 right-0 bg-white">
                <IconButton onClick={close}>
                    <FontAwesomeIcon icon={faXmarkCircle} />
                </IconButton>
            </div>
            <CardMedia
                className="max-h-[245px]"
                component="img"
                alt="green iguana"
                height="140"
                image={dataState.img}
            />
            <CardContent className="flex-1">
                <Typography gutterBottom variant="h5" component="div">
                    {enableEditingState ? (
                        <TextField
                            size="small"
                            className="w-full"
                            value={dataState.title}
                            onChange={(e) => {
                                setDataState((pre) => {
                                    return { ...pre, title: e.target.value };
                                });
                            }}
                        />
                    ) : (
                        dataState.title
                    )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <div className="flex flex-col">
                        <p className="flex flex-row justify-between items-center">
                            <b>Bắt đầu</b>
                            {enableEditingState ? (
                                <DateTimePicker
                                    className="h-[40px] w-full md:w-auto flex-1 pl-4"
                                    value={dataState.start}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, start: new Date(e.getTime()) });
                                    }}
                                />
                            ) : (
                                <span className="flex-1 ml-4">{dataState.start.toLocaleString()}</span>
                            )}
                        </p>
                        <p className="flex flex-row justify-between items-center">
                            <b>Kết thúc</b>
                            {enableEditingState ? (
                                <DateTimePicker
                                    className="h-[40px] w-full md:w-auto flex-1 pl-4"
                                    value={dataState.end}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, end: new Date(e.getTime()) });
                                    }}
                                />
                            ) : (
                                <span className="flex-1 ml-4">{dataState.end.toLocaleString()}</span>
                            )}
                        </p>
                    </div>
                    <div className="mt-2">
                        {enableEditingState ? (
                            <TextField
                                size="small"
                                className="w-full"
                                value={dataState.description}
                                onChange={(e) => {
                                    setDataState((pre) => {
                                        return { ...pre, description: e.target.value };
                                    });
                                }}
                                multiline
                                rows={3}
                                maxRows={4}
                            />
                        ) : (
                            dataState.description
                        )}
                    </div>
                </Typography>
            </CardContent>
            <CardActions>
                {!enableEditingState ? (
                    <>
                        <Button size="small" onClick={startEditing}>
                            Sửa
                        </Button>
                        <Button color={'error'} size="small" onClick={showRemoveAlert}>
                            Xóa
                        </Button>
                        <AlertDialogSlide
                            title="Xác nhận xóa"
                            content="Bạn có đồng ý xóa sự kiện này?"
                            open={removeAlertState}
                            handleClickOpen={showRemoveAlert}
                            handleClose={hideRemoveAlert}
                            yesButton={'Đồng ý'}
                            noButton={'Hủy'}
                            handleSubmit={remove}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            size="small"
                            onClick={(e) => {
                                submitUpdate();
                                setEnableEditingState(false);
                            }}
                        >
                            Thay đổi
                        </Button>
                        <Button
                            color={'error'}
                            size="small"
                            onClick={(e) => {
                                cancelUpdate();
                                setEnableEditingState(false);
                            }}
                        >
                            Hủy
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}
