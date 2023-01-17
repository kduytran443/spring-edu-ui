import { Divider } from '@mui/material';
import CourseListIntro from '~/components/CourseListIntro';

function HomePage() {
    return (
        <div className="flex flex-col max-w-full flex-1 w-full md:w-[calc(100%-96px)]">
            <CourseListIntro
                title="Lập trình"
                icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
            />
            <div className="mt-10">
                <Divider />
            </div>
            <CourseListIntro
                title="Âm nhạc"
                icon="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/music-icon-mohammed-jabir-ap.jpg"
            />
            <div className="mt-10">
                <Divider />
            </div>
            <CourseListIntro
                title="Lập trình"
                icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
            />
            <div className="mt-10">
                <Divider />
            </div>
            <CourseListIntro
                title="Lập trình"
                icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
            />
            <div className="mt-10">
                <Divider />
            </div>
        </div>
    );
}

export default HomePage;
