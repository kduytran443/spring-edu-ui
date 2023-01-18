import { useState } from 'react';
import CourseListIntro from '~/components/CourseListIntro';

function CategoryPage() {
    const [categoryDataState, setCategoryDataState] = useState({
        title: 'Lập trình',
        icon: 'https://cdn-icons-png.flaticon.com/512/3662/3662830.png',
        description: 'Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.',
    });

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row items-center ">
                <div className="mr-4 w-[40px] select-none overflow-hidden rounded">
                    <img className="w-full" alt="logo" src={categoryDataState.icon} />
                </div>
                <span className="text-2xl md:text-4xl font-black">{categoryDataState.title}</span>
            </div>
            <CourseListIntro
                hiddenHeader
                title="Lập trình"
                icon="https://st2.depositphotos.com/2904097/5667/v/950/depositphotos_56670849-stock-illustration-vector-coding-icon.jpg"
            />
        </div>
    );
}

export default CategoryPage;
