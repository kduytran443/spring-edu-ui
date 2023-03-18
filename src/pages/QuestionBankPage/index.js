import { faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import QuestionBankCreateDialog from '~/components/QuestionBankCreateDialog';
import QuestionBankItem from '~/components/QuestionBankItem';
import { HOME_PAGE_URL } from '~/constants';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';

function QuestionBankPage() {
    const location = useLocation();
    const [questionBankList, setQuestionBankList] = useState([]);

    const navigate = useNavigate();
    const loadData = () => {
        questionBankService.getQuestionBankByUser().then((data) => {
            setQuestionBankList(data);
        });
    };

    useEffect(() => {
        loadData();
    }, [location]);

    return (
        <div className="p-4">
            <div className="mb-[6px]">
                <Button
                    onClick={(e) => {
                        navigate(HOME_PAGE_URL);
                    }}
                    startIcon={<FontAwesomeIcon icon={faReply} />}
                >
                    Trang chủ
                </Button>
            </div>
            <h1 className="font-bold text-2xl my-6 md:my-2">Ngân hàng câu hỏi</h1>
            <div className="my-4">
                <QuestionBankCreateDialog
                    reload={loadData}
                    button={
                        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus} />}>
                            Tạo ngân hàng câu hỏi
                        </Button>
                    }
                />
            </div>
            <div className="flex flex-col flex-wrap items-start md:flex-row">
                {questionBankList.map((questionBank) => {
                    return (
                        <div className="p-4 max-w-full">
                            <QuestionBankItem itemData={questionBank} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default QuestionBankPage;
