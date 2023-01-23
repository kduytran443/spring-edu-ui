import { faArrowLeft, faArrowRight, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000',
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px',
};

const slideImages = [
    {
        url: 'https://cdn.pixabay.com/photo/2022/07/11/08/44/tower-7314495_960_720.jpg',
        caption: 'Slide 1',
    },
    {
        url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/forest-1072828_960_720.jpg',
        caption: 'Slide 2',
    },
    {
        url: 'https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708552_960_720.jpg',
        caption: 'Slide 3',
    },
    {
        url: 'https://cdn.pixabay.com/photo/2022/12/15/20/26/frozen-lake-7658478_960_720.jpg',
        caption: 'Slide 1',
    },
    {
        url: 'https://cdn.pixabay.com/photo/2023/01/09/10/39/egret-7707108_960_720.jpg',
        caption: 'Slide 2',
    },
    {
        url: 'https://cdn.pixabay.com/photo/2023/01/08/05/52/mountain-7704597_960_720.jpg',
        caption: 'Slide 3',
    },
];

const properties = {
    prevArrow: (
        <Button sx={{ width: '48px', height: '48px', borderRadius: '9999' }} variant="outlined">
            <FontAwesomeIcon className="text-xl" icon={faArrowLeft} />
        </Button>
    ),
    nextArrow: (
        <Button sx={{ width: '48px', height: '48px', borderRadius: '9999' }} variant="outlined">
            <FontAwesomeIcon className="text-xl" icon={faArrowRight} />
        </Button>
    ),
};

const SildeshowIntroduction = () => {
    return (
        <div className="slide-container">
            <Slide {...properties} transitionDuration={500}>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default SildeshowIntroduction;
