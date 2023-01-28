import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CustomVideoPlayer from '~/components/CustomVideoPlayer';
import ReactQuill from 'react-quill';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function ClassIntroPage() {
    const [classDataState, setClassDataState] = useState(() => {
        return {
            name: 'Lớp học piano StarsPluck',
            description: `Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự Bootstrap 4.
            Bạn sẽ học được gì?
            Biết cách xây dựng website Responsive
            Hiểu được tư tưởng thiết kế với Grid system
            Tự tay xây dựng được thư viện CSS Grid
            Tự hiểu được Grid layout trong bootstrap`,
            price: '99000',
            creDate: '23/01/2023',
            startDate: '30/01/2023',
            endDate: '5/01/2023',
            schedule: '7h - 11h Thứ 3 hàng tuần',
            status: 'Đã bắt đầu',
        };
    });

    const [editorValueState, setEditorValueState] = useState('');

    return (
        <div className="w-full p-4 md:p-6 flex-1 flex lg:flex-row flex-col-reverse relative top-0">
            <div className="flex-1">
                <h1 className="text-4xl font-black mb-4">{classDataState.name}</h1>

                <div className="flex flex-row items-center mb-4 md:mb-0">
                    <Avatar
                        src="https://mui.com/static/images/avatar/2.jpg"
                        variant="circular"
                        style={{ width: '64px', height: '64px' }}
                    />
                    <h1 className="ml-2 font-bold text-xl">Alex Hunter</h1>
                </div>
                <div>
                    <div className="my-4">{classDataState.description}</div>
                    <div className="h-full">
                        <ReactQuill theme="snow" value={editorValueState} onChange={setEditorValueState} />
                    </div>
                </div>
            </div>
            <div className="w-full top-0 left-0 w-full xl:w-[480px] lg:w-[360px] relative flex flex-col">
                <div className="flex flex-col w-full xl:w-[480px] lg:w-[360px] items-center justify-start mb-6 lg:mb-0 lg:fixed">
                    <div className="w-full p-0 lg:p-4">
                        <CustomVideoPlayer />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className={'text-3xl font-bold text-orange-400 text-center'}>
                            {classDataState.price > 0 ? VND.format(classDataState.price) : 'Miễn phí'}
                        </span>
                        <div className="my-4">
                            <Button size="large" className="bg-orange-400" variant="contained">
                                Đăng ký học <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                            </Button>
                        </div>
                        <ul>
                            <li>
                                <span>
                                    Ngày bắt đầu: <b>{classDataState.startDate}</b>
                                </span>
                            </li>
                            <li>
                                <span>
                                    Ngày kết thúc: <b>{classDataState.endDate}</b>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassIntroPage;
