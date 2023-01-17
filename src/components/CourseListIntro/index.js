import { faDiagramNext, faForward, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider } from '@mui/material';
import CourseItemIntro from '../CourseItemIntro';

function CourseListIntro({ listItem = [1, 1, 1, 1, 1, 1, 1, 1], title = '', icon = '', link = '' }) {
    //item: image, title, description, avatar, userLink, courseLink, review, courseQuantity, price, time

    return (
        <div className="w-full">
            <div className="px-2 flex-col flex">
                <div className="flex flex-row items-center justify-start mb-4 mt-8 flex-wrap">
                    <div className="flex flex-row items-center flex-wrap">
                        <div className="md:w-[40px] w-[36px] mr-4 select-none overflow-hidden rounded">
                            <img className="w-full" alt="logo" src={icon} />
                        </div>
                        <span className="text-2xl md:text-3xl font-black">{title}</span>
                    </div>
                    <div className="ml-8">
                        <Button variant="text" startIcon={<FontAwesomeIcon icon={faForward} />}>
                            Xem thêm
                        </Button>
                    </div>
                </div>
                <div className="ml-4">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span>
                        <b>276.368+</b> người khác đã học
                    </span>
                </div>
            </div>
            <div className="overflow-x-scroll w-full">
                <ul className="flex flex-row items-center ">
                    {listItem.map((item, index) => {
                        return (
                            <li className="min-w-[345px] mx-2 my-4">
                                <CourseItemIntro />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default CourseListIntro;
