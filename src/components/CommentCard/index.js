import { faComment, faListDots, faRemove, faReply, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, Rating, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentService } from '~/services/commentService';
import CommentDeleteDialog from './CommentDeleteDialog';
import { useContext } from 'react';
import { NotificationSocketContext } from '../NotificationSocketProvider';

function CommentCard({
    username = 'Ẩn danh',
    parentId,
    children,
    fullname = 'Ẩn danh',
    avatar,
    comment,
    isParent = false,
    date = Date.now(),
    reload = () => {},
    owner = false,
    id,
}) {
    let createdDate = new Date(date);
    const [visibleReply, setVisibleReply] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [commentPrivateMode, setCommentPrivateMode] = useState(0);
    const { lessonId } = useParams();

    const reset = () => {
        setVisibleReply(false);
        setCommentContent('');
    };

    const sendContext = useContext(NotificationSocketContext);
    const submit = () => {
        const obj = {
            lessonId: lessonId,
            content: commentContent,
            parentId: parentId,
            privateMode: commentPrivateMode,
        };
        commentService.post(obj).then((data) => {
            sendContext([], 'COMMENT');
            reset();
        });
    };

    return (
        <div className={`w-full my-2 shadow rounded ${!parentId && 'border  border-slate-200'}`}>
            <div className="flex flex-col w-full py-2 px-4 my-2 rounded ">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex flex-row justify-center items-center mb-2 sm:mb-0">
                        <Avatar src={avatar} sx={{ width: '32px', height: '32px' }} />
                        <h3 className="font-bold ml-4">{fullname}</h3>
                    </div>
                    <div className="flex flex-row items-center">
                        <div>{`${createdDate.getDate()}/${
                            createdDate.getMonth() + 1
                        }/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`}</div>
                        {owner && (
                            <div className="ml-4">
                                <CommentDeleteDialog id={id} reload={reload} />
                            </div>
                        )}
                    </div>
                </div>
                <p className="mt-4">{comment}</p>
            </div>
            <div className="w-full pl-8 md:pl-12">
                {children}
                {isParent && (
                    <div className={`w-full pb-2 rounded`}>
                        {visibleReply && (
                            <>
                                <div className="w-full">
                                    <div className="w-full">
                                        <TextField
                                            label="Bình luận"
                                            placeholder="Bình luận"
                                            className="w-full"
                                            value={commentContent}
                                            onInput={(e) => {
                                                setCommentContent(e.target.value);
                                            }}
                                            variant="standard"
                                            maxRows={5}
                                            minRows={2}
                                            multiline
                                        />
                                    </div>
                                </div>
                                <div
                                    onClick={commentContent ? submit : () => {}}
                                    className={`w-full my-2 p-2 text-center rounded ${
                                        commentContent
                                            ? 'hover:bg-blue-600 cursor-pointer active:bg-blue-700 bg-blue-500 shadow-blue-300'
                                            : 'bg-gray-300 shadow-gray-200'
                                    } shadow select-none text-white font-bold`}
                                >
                                    <FontAwesomeIcon icon={faComment} className="mr-2" /> Bình luận
                                </div>
                            </>
                        )}
                        <div>
                            <Button
                                size="small"
                                onClick={(e) => {
                                    setVisibleReply(!visibleReply);
                                }}
                                color={!visibleReply ? 'primary' : 'error'}
                            >
                                {!visibleReply ? 'Trả lời' : 'Hủy'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentCard;
