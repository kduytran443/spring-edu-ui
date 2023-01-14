import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';

function SimpleFooter() {
    return (
        <div className="bg-white w-full p-6 mt-8 flex flex-col sm:flex-row items-center justify-center border-slate-200 border-t-[1px]">
            <div className="flex flex-col sm:flex-row items-center justify-center">
                <span>Theo dõi chúng tôi qua</span>
                <div className="ml-0 sm:ml-8">
                    <Tooltip title="Facebook">
                        <IconButton>
                            <FontAwesomeIcon icon={faFacebook} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Youtube">
                        <IconButton>
                            <FontAwesomeIcon icon={faYoutube} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Twitter">
                        <IconButton>
                            <FontAwesomeIcon icon={faTwitter} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default SimpleFooter;
