import { faDiagramNext, faForward, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_PAGE_URL } from '~/constants';
import CourseItemIntro from '../CourseItemIntro';

function CourseListIntro({
    listItem = [1, 1, 1, 1, 1, 1, 1, 1],
    title = '',
    icon = '',
    link = '',
    scroll = true,
    hiddenHeader = false,
}) {
    //item: image, title, description, avatar, userLink, courseLink, review, courseQuantity, price, time

    console.log(hiddenHeader);

    const navigate = useNavigate();

    const navigateToPage = () => {
        navigate(CATEGORY_PAGE_URL);
    };

    return (
        <div className="w-full flex flex-col items-center">
            {!hiddenHeader && (
                <div className="pb-2 flex-col flex w-full">
                    <div className="flex flex-row items-center justify-between mb-4 mt-8 flex-wrap">
                        <div className="flex flex-row items-center flex-wrap">
                            <div className="md:w-[40px] w-[36px] mr-4 select-none overflow-hidden rounded">
                                <img className="w-full" alt="logo" src={icon} />
                            </div>
                            <span className="text-2xl md:text-3xl font-black">{title}</span>
                        </div>
                        <div className="ml-8">
                            <Button
                                onClick={navigateToPage}
                                variant="text"
                                startIcon={<FontAwesomeIcon icon={faForward} />}
                            >
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
                    <div></div>
                </div>
            )}
            <div className={`${scroll && 'overflow-x-scroll'} w-full`}>
                <ul className={`flex flex-row items-center ${!scroll && 'flex-wrap'} md:flex-wrap`}>
                    {listItem.map((item, index) => {
                        return (
                            <li className="min-w-[328px] max-w-[328px] md:mx-2 ">
                                <CourseItemIntro />
                            </li>
                        );
                    })}
                </ul>
            </div>
            {!hiddenHeader && (
                <div>
                    <Button onClick={navigateToPage} variant="text" startIcon={<FontAwesomeIcon icon={faForward} />}>
                        Xem thêm
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CourseListIntro;
