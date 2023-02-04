import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackspace, faBackward, faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

function ClassLessonPage() {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [lessonDataState, setLessonDataState] = useState(() => {
        return {
            id: 1,
            title: 'Giới thiệu Spring Boot',
            content: `Phần 1: spring boot để phát triển web service

            Trong số các bạn mình tin là 98% ai cũng biết tới nền tảng thương mại điện tử tiki. Hiện tiki có 2 nền tảng là app và web, khi các bạn dùng web order hàng hóa thì ngay lập tức app sẽ đồng bộ theo dữ liệu mà bạn mới thao tác trên web
            
            Vậy để làm được điều đó tiki đã sử dụng cơ chế web service, dùng chung 1 database và các hàm sử dụng cho web và app cũng sẽ chung với nhau. Có nghĩa là ví dụ bạn chỉ cần viết hàm order thì hàm đó sẽ dùng chung luôn cho web và app
            
            Để xây dựng api web service sử dụng ngôn ngữ java, chúng ta cũng có rất nhiều cách tuy nhiên nó khá là khó và cũng hơi phức tạp. Vì vậy nhà cung cấp Spring framework đã phát triển ra cho chúng ta 1 công nghệ cực kì hữu ích đó chính là Spring boot
            
            Khi spring boot ra đời, việc xây dựng API web service không còn là cái gì đó quá to tát và nó cũng giúp cho chúng ta tiết kiệm được thời gian rất nhiều
            
            Phần 2: spring boot phát triển lập trình web
            
            Như các bạn cũng đã biết Spring framework có cho ra đời 1 nền tảng làm web đó là Spring mvc. Tuy nhiên trước khi Spring boot ra đời năm 2014 thì việc xây dựng Spring MVC phải làm thủ công (thủ công tạm hiểu là không sử dụng java Spring Boot)
            
            Trong quá trình xây dựng Spring MVC theo cách thủ công (các bạn có thể xem series học spring mvc theo phương pháp thủ công TẠI ĐÂY) các nhà phát triển Spring framework thấy có 1 số vấn đề do đó Spring Boot được nhà phát triển spring framework cho ra đời để hỗ trợ việc xây dựng Spring MVC 1 cách tốt hơn`,
            date: new Date(2023, 0, 19, 20, 0),
        };
    });

    return (
        <div className="w-full p-4 md:p-0 text-justify">
            <Button
                onClick={(e) => {
                    navigate('/class/' + classId);
                }}
                startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
                Quay lại
            </Button>
            <h1 className="font-bold text-2xl my-4">{lessonDataState.title}</h1>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>
                        <div className="font-bold text-2xl">Nội dung</div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p>{lessonDataState.content}</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <div></div>
        </div>
    );
}

export default ClassLessonPage;
