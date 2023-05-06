import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowRight,
    faFolder,
    faGlobe,
    faLock,
    faPen,
    faSave,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import NoteEditDialog from '~/components/NoteEditDialog';
import NoteFolderEditDialog from '~/components/NoteFolderEditDialog';
import RichTextEditor from '~/components/RichTextEditor';
import { noteService } from '~/services/noteService';
import { useUser } from '~/stores/UserStore';
import { renderToTime } from '~/utils';

function NotePage() {
    const { noteId } = useParams();
    const [note, setNote] = useState();
    const location = useLocation();
    const [alert, setAlert] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [content, setContent] = useState();
    const [oldContent, setOldContent] = useState();
    const navigate = useNavigate();
    const [privateMode, setPrivateMode] = useState(1);
    const [userData, userDispatch] = useUser();

    const loadNote = () => {
        noteService.getById(noteId).then((data) => {
            if (data.id) {
                setNote(data);
                setPrivateMode(data.privateMode);
                setContent(data.content);
                setOldContent(data.content);
                if (data.noteFolder.status == 0) {
                    navigate('/not-found');
                }
            } else {
                navigate('/not-found');
            }
        });
    };

    const save = () => {
        const obj = {
            id: noteId,
            content: content,
        };

        noteService.put(obj).then((data) => {
            if (data.id) {
                setAlert(true);
                setEnableEdit(false);
                setOldContent(content);
                setTimeout(() => {
                    setAlert(false);
                }, 1000);
            }
        });
    };

    useEffect(() => {
        loadNote();
    }, [location]);

    const isOwner = () => {
        return userData.id === note.userId;
    };

    useEffect(() => {
        if (note && note.privateMode) {
            if (userData.id && userData.id !== note.userId) {
                navigate('/not-found');
            }
        }
    }, [userData]);

    const changePrivateMode = () => {
        const obj = {
            id: noteId,
            privateMode: 1,
        };
        if (privateMode) {
            obj.privateMode = 0;
        }
        noteService.put(obj).then((data) => {
            if (data.id) {
                setPrivateMode(data.privateMode);
            }
        });
    };

    return (
        <div className="w-full">
            {note && (
                <div className="w-full p-4 shadow-lg rounded-lg">
                    <AlertSuccessDialog open={alert} message="Đã lưu ghi chú" />
                    <NoteFolderEditDialog
                        id={note.noteFolder.id}
                        button={
                            <div
                                className="text-gray-500 select-none cursor-pointer hover:text-blue-500"
                                onClick={(e) => {
                                    if (!isOwner()) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faFolder} className="mr-2 text-lg" />
                                {note.noteFolder && note.noteFolder.name}
                            </div>
                        }
                        reload={loadNote}
                    />
                    <div className="w-full mt-4 flex flex-row items-center">
                        <Avatar src={note.userAvatar} />
                        <div className="ml-2">
                            <div>{note.userFullname}</div>
                            <div className="text-gray-400">@{note.username}</div>
                        </div>
                    </div>
                    <div className="w-full py-4 flex flex-row items-center justify-between flex-wrap">
                        <NoteEditDialog
                            button={
                                <div
                                    onClick={(e) => {
                                        if (!isOwner()) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }
                                    }}
                                    className="group flex hover:underline select-none cursor-pointer flex-row items-center text-lg font-bold text-blue-500 w-full md:w-auto my-4 md:my-0"
                                >
                                    {note.name}
                                    {isOwner() && (
                                        <div className="group-hover:block hidden ml-2">
                                            <FontAwesomeIcon icon={faPen} />
                                        </div>
                                    )}
                                </div>
                            }
                            id={note.id}
                            reload={loadNote}
                        />
                        <div className="flex flex-row items-center">
                            <div className="mr-4">
                                {enableEdit ? (
                                    <div className="flex flex-row items-center">
                                        <div className="mr-4">
                                            <Button
                                                onClick={(e) => {
                                                    setEnableEdit(false);
                                                    setContent(oldContent);
                                                }}
                                                color="error"
                                                startIcon={<FontAwesomeIcon icon={faX} />}
                                            >
                                                Hủy
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={(e) => {
                                                    save();
                                                }}
                                                startIcon={<FontAwesomeIcon icon={faSave} />}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {isOwner() && (
                                            <Button
                                                onClick={(e) => {
                                                    setEnableEdit(true);
                                                }}
                                                startIcon={<FontAwesomeIcon icon={faPen} />}
                                            >
                                                Sửa nội dung
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                            {note && (
                                <div className="mx-2">
                                    <IconButton
                                        onClick={(e) => {
                                            if (isOwner()) {
                                                changePrivateMode();
                                            }
                                        }}
                                        color={privateMode ? 'default' : 'primary'}
                                    >
                                        <FontAwesomeIcon icon={privateMode ? faLock : faGlobe} />
                                    </IconButton>
                                </div>
                            )}
                            {note && (
                                <>
                                    {note.createdDate > note.modifiedDate
                                        ? renderToTime(note.createdDate)
                                        : renderToTime(note.modifiedDate)}
                                </>
                            )}
                        </div>
                    </div>
                    {note.id && (
                        <RichTextEditor
                            disabled={!isOwner()}
                            readOnly={!enableEdit}
                            data={content || ''}
                            setData={setContent}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default NotePage;
/*

                    <div className="w-full flex flex-row items-center">
                        <div
                            className="text-gray-500 select-none cursor-pointer hover:text-blue-500"
                            onClick={(e) => {}}
                        >
                            <FontAwesomeIcon icon={faFolder} className="mr-2 text-lg" />
                            {note.noteFolder && note.noteFolder.name}
                        </div>
                    </div>
*/
