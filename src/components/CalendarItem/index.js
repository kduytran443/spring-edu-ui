import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CalendarItem({
    id = 0,
    title = 'Tiêu đề',
    description = 'Mô tả',
    start = new Date(2023, 0, 18, 17, 0),
    end = new Date(2023, 0, 18, 18, 30),
    img = 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    onRemove = () => {},
}) {
    return (
        <Card className="w-full h-full flex flex-col">
            <CardMedia className="max-h-[245px]" component="img" alt="green iguana" height="140" image={img} />
            <CardContent className="flex-1">
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <div className="flex flex-col">
                        <p>
                            <b>Bắt đầu</b>: {start.toLocaleString()}
                        </p>
                        <p>
                            <b>Kết thúc</b>: {end.toLocaleString()}
                        </p>
                    </div>
                    <div className="mt-2">{description}</div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Sửa</Button>
                <Button color={'error'} size="small" onClick={onRemove}>
                    Xóa
                </Button>
            </CardActions>
        </Card>
    );
}
