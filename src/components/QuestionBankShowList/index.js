import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { choiceQuestionSerivce } from '~/services/choiceQuestionSerivce';
import { questionBankService } from '~/services/questionBankService';
import { useUser } from '~/stores/UserStore';
import AddQuestionBankToClassDialog from '../AddQuestionBankToClassDialog';
import QuestionBankDetailsViewOnlyDialog from '../QuestionBankDetailsViewOnlyDialog';
import QuestionBankItem from '../QuestionBankItem';
import RemoveQuestionBankFromClassDialog from '../RemoveQuestionBankFromClassDialog';

function QuestionBankShowList() {
    const { classId } = useParams();
    const location = useLocation();
    const [questionBankList, setQuestionBankList] = useState([]);
    const navigate = useNavigate();

    const loadData = () => {
        questionBankService.getQuestionBankByClassId(classId).then((data) => {
            setQuestionBankList(data);
        });
    };
    const [userState, dispatchUserState] = useUser();

    useEffect(() => {
        loadData();
    }, [location]);

    return (
        <div>
            <h1 className="font-bold text-2xl my-6 md:my-2">Ngân hàng câu hỏi</h1>
            <div className="flex flex-col flex-wrap items-start md:flex-row">
                {questionBankList.map((questionBank) => {
                    return (
                        <div className="p-4 flex flex-col items-center justify-center">
                            <QuestionBankDetailsViewOnlyDialog
                                questionBankId={questionBank.id}
                                button={
                                    <div className="p-4 hover:bg-slate-100 duration-200 cursor-pointer rounded">
                                        <div>
                                            <Avatar
                                                variant="square"
                                                src="https://cdn-icons-png.flaticon.com/512/3767/3767084.png"
                                                sx={{ width: '64px', height: '64px' }}
                                            />
                                        </div>
                                        <div>{questionBank.name}</div>
                                    </div>
                                }
                            />
                            {userState.username === questionBank.username && (
                                <div>
                                    <RemoveQuestionBankFromClassDialog
                                        reload={loadData}
                                        questionBankId={questionBank.id}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="flex flex-row mb-10 md:mb-0 items-center">
                    <AddQuestionBankToClassDialog alreadyList={questionBankList} reload={loadData} />
                </div>
            </div>
        </div>
    );
}

export default QuestionBankShowList;
