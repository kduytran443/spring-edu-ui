import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import images from '~/assets/images';
import Logo from '~/components/Logo';

function SimpleFooter() {
    return (
        <div className="bg-gray-900 text-white w-full p-4 pb-6 flex flex-col sm:flex-row items-center sm:items-start justify-center border-slate-200 border-t-[1px]">
            <div className="flex flex-row items-center justify-center">
                <div>
                    <div className="flex flex-row items-center">
                        <div className="w-[72px] rounded-lg p-2 mr-2">
                            <Logo />
                        </div>
                        <b className="text-lg">Nền tảng học tập</b>
                    </div>
                    <p className="text-gray-300">
                        <p>Điện thoại: 0919.639.671</p>
                        <p>Email: duyb1906443@student.ctu.edu.vn</p>
                        <p>Địa chỉ: Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex mt-6 sm:mt-0 flex-col sm:flex-row items-center justify-center">
                    <span>Theo dõi chúng tôi qua</span>
                    <div className="ml-0 sm:ml-8">
                        <Tooltip title="Facebook">
                            <IconButton color="inherit">
                                <FontAwesomeIcon icon={faFacebook} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Youtube">
                            <IconButton color="error">
                                <FontAwesomeIcon icon={faYoutube} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Twitter">
                            <IconButton color="primary">
                                <FontAwesomeIcon icon={faTwitter} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="p-4 cursor-pointer">
                    <img alt="" src={images.aboutUs} className="w-[160px]" />
                </div>
            </div>
        </div>
    );
}

export default SimpleFooter;
