import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { renderToDate } from '~/utils';

function Certificate({ certificate = {} }) {
    const [certificateState, setCertificateState] = useState(certificate);
    const navigate = useNavigate();

    useEffect(() => {
        if (certificate) {
            setCertificateState(certificate);
        }
    }, [certificate]);

    return (
        <div className="w-full text-lg">
            <div className="w-full p-10 bg-cyan-900 text-white flex flex-row items-center justify-between">
                <div className="max-w-[240px] flex flex-row items-center">
                    <img
                        className="w-[48px] shadow bg-white rounded-lg"
                        alt="certification"
                        src={images.springBootLogo}
                    />
                    <div className="ml-4 font-bold text-2xl">Spring EDU</div>
                </div>
                <div className="font-semibold">Ngày cấp {renderToDate(certificateState.date)}</div>
            </div>
            <div
                style={{
                    backgroundImage: `url(${images.certificationBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="w-full min-h-[240px] bg-gray-100 flex flex-col items-center justify-center"
            >
                <div className="mt-10">Chứng nhận</div>
                <div className="text-2xl font-bold my-4">
                    {certificateState.fullname} - {certificateState.username}
                </div>
                <div className="my-4">Đã tham gia và hoàn thành lớp học</div>
                <div
                    onClick={(e) => {
                        navigate('/class/' + certificateState?.classDTO.id + '/intro');
                    }}
                    className="text-2xl uppercase font-bold hover:text-blue-600 cursor-pointer mb-4 border-b-2 border-slate-400"
                >
                    {certificateState.classDTO && certificateState?.classDTO.name}
                </div>
                <div className="mb-4">
                    {certificateState.avg >= 50 ? 'Đạt' : 'Không đạt'}: {certificateState.avg} / 100
                </div>
                {certificateState.comment && <div className="mb-4">Nhận xét: {certificateState.comment}</div>}
                <div className="w-[120px] bg-white h-[120px] mt-16 rounded-full overflow-hidden">
                    <img className="h-full" alt="certification" src={images.miniFinishSeal} />
                </div>
                <img className="max-w-[420px]" alt="certification" src={images.signature} />
                <div className="mb-10 mt-2 font-semibold">Spring Edu</div>
            </div>
        </div>
    );
}

export default Certificate;
