import { Divider } from '@mui/material';
import CourseListIntro from '~/components/CourseListIntro';
import SildeshowIntroduction from '~/components/SildeshowIntroduction';
import TeacherListIntro from '~/components/TeacherListIntro';

function HomePage() {
    return (
        <>
            <SildeshowIntroduction />
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
        </>
    );
}

export default HomePage;
