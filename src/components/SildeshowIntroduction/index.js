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
        url: 'https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg?w=2000',
    },
    {
        url: 'https://media.istockphoto.com/id/1165187444/vector/education-banner.jpg?s=1024x1024&w=is&k=20&c=ZuiIeRUJC3m1I-BbsbuMhD5QdgNm5T3xcl-rF9uyl_Q=',
    },
    {
        url: 'https://img.freepik.com/premium-vector/proper-education-banner_1325-210.jpg?w=2000',
    },
    {
        url: 'https://as1.ftcdn.net/v2/jpg/01/07/23/04/1000_F_107230427_eSb9HS26aoakxIqF39fVpeATA6zklbpG.jpg',
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
        <div className="slide-container md:rounded-lg md:overflow-hidden md:shadow-md">
            <Slide {...properties} transitionDuration={500}>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div
                            className="hover:cursor-grab active:cursor-grabbing"
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${slideImage.url})`,
                                backgroundPosition: 'center',
                            }}
                        ></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default SildeshowIntroduction;
