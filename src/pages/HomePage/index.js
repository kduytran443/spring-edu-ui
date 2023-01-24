import { Divider } from '@mui/material';
import { useState } from 'react';
import CategoryCard from '~/components/CategoryCard';
import CourseListIntro from '~/components/CourseListIntro';
import SildeshowIntroduction from '~/components/SildeshowIntroduction';
import TeacherListIntro from '~/components/TeacherListIntro';
import { CATEGORY_PAGE_URL } from '~/constants';

/*

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
*/

function HomePage() {
    const [categoryListState, setCategoryListState] = useState([
        {
            id: 1,
            name: 'Lập trình',
            description: `Lập trình máy tính hay lập chương trình máy tính thường gọi tắt là lập trình (tiếng Anh: Computer programming, thường gọi tắt là programming) là việc lập ra ...`,
            img: 'https://caodangbachkhoahanoi.edu.vn/wp-content/uploads/2022/04/hoc-lap-trinh-bat-dau-tu-dau2.jpg',
        },
        {
            id: 2,
            name: 'Âm nhạc',
            description: `Âm nhạc là một bộ môn nghệ thuật dùng âm thanh để diễn đạt cảm xúc của người hát hoặc người nghe. Các yếu tố chính của nó là cao độ (điều chỉnh giai điệu), ...`,
            img: 'https://assets.australianballet.com.au/images/Music/_1200x630_crop_center-center_82_none/Music-Header_2500x1780-1.jpg?mtime=1657246074',
        },
        {
            id: 3,
            name: 'Kinh tế',
            description: `Ngành kinh tế là ngành học về những hoạt động trao đổi, giao thương, logictics, buôn bán hàng hóa, dịch vụ giữa các cá thể: người tiêu dùng, hộ ...`,
            img: 'https://huongnghiep.hocmai.vn/wp-content/uploads/2022/01/1-42.png',
        },
        {
            id: 4,
            name: 'Đồ họa',
            description: `Đồ họa là một lĩnh vực truyền thông trong đó thông điệp được tiếp nhận qua con đường thị giác. Thiết kế đồ họa là tạo ra các giải pháp bằng hình ảnh cho các ...`,
            img: 'https://mythuat.info/wp-content/uploads/2020/03/N49PrEbjjtEpDpTsDZbkyg-970-80.jpg',
        },
        {
            id: 5,
            name: 'Vẽ tranh',
            description: `Tranh vẽ nói chung hay còn gọi là hội họa, là ngành nghệ thuật tạo hình phong phú, hấp dẫn và rộng lớn. Tranh phản ánh nhiều mặt về thế giới ...`,
            img: 'https://bucket.nhanh.vn/6dc534-15668/art/artCT/20210516_t1T2PwS2bz8hy7YeEnqFKFhK.jpg',
        },
    ]);

    return (
        <>
            <SildeshowIntroduction />
            <Divider />
            <ul className="flex flex-row flex-wrap">
                {categoryListState.map((category, index) => {
                    return (
                        <li key={index} className={`lg:max-w-1/3 md:max-w-1/2 max-w-[100%] md:w-1/2 lg:w-1/3 w-[100%]`}>
                            <div className="w-full">
                                <CategoryCard
                                    navigateTo={'/category/' + category.id}
                                    name={category.name}
                                    img={category.img}
                                    description={category.description}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default HomePage;
