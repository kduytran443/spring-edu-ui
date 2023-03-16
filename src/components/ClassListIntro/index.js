import { faDiagramNext, faForward, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_PAGE_URL } from '~/constants';
import CategoryCard from '../CategoryCard';
import ClassCard from '../ClassCard';
import ClassReviewCard from '../ClassReviewCard';

function ClassListIntro({ listItem, title = '', icon = '', link = '', scroll = true, hiddenHeader = false }) {
    //item: image, title, description, avatar, userLink, courseLink, review, courseQuantity, price, time

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
            <ul className={`flex flex-row flex-wrap w-full`}>
                {listItem.map((item, index) => {
                    console.log(item.registed);

                    let nav = '/intro';

                    return (
                        <li key={index} className={`lg:max-w-1/3 lg:w-1/3 md:max-w-1/2 max-w-[100%] md:w-1/2 w-[100%]`}>
                            <div className="w-full">
                                <ClassReviewCard
                                    navigateTo={`/class/${item.id}` + nav}
                                    name={item.name}
                                    img={item.avatar}
                                    description={item.shortDescription}
                                    avatar={item.userAvatar}
                                    fee={item.fee}
                                    userFullname={item.userFullname}
                                    people={item.memberCount}
                                    review={item.stars}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
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

export default ClassListIntro;
