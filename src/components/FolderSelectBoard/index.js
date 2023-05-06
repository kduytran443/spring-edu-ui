import {
    faArrowDown,
    faArrowLeft,
    faArrowUp,
    faDownLong,
    faFile,
    faFolder,
    faLeftLong,
    faPaperPlane,
    faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classService } from '~/services/classService';
import { messageService } from '~/services/messageService';
import ChatMessage from '../ChatMessage';
import { classMemberService } from '~/services/classMemberService';
import { NotificationSocketContext } from '../NotificationSocketProvider';
import { useContext } from 'react';
import { useRef } from 'react';
import { useUser } from '~/stores/UserStore';
import { noteFolderService } from '~/services/noteFolderService';
import images from '~/assets/images';
import NoteFolderCreateDialog from '../NoteFolderCreateDialog';
import NoteCreateDialog from '../NoteCreateDialog';
import { noteService } from '~/services/noteService';
import RichTextEditor from '../RichTextEditor';
import { renderToTime } from '~/utils';
import { openInNewTab } from '~/utils';
import NoteFolderEditDialog from '../NoteFolderEditDialog';
import DeleteFolderDialog from '../DeleteFolderDialog';

function FolderSelectBoard() {
    const [noteFolders, setNoteFolders] = useState([]);
    const [selectedNoteFolderId, setSelectedNoteFolderId] = useState();
    const [selectedNoteId, setSelectedNoteId] = useState();
    const [note, setNote] = useState();
    const [noteList, setNoteList] = useState([]);
    const [selectedNote, setSelectedNote] = useState({});
    const [selectedFolder, setSelectedFolder] = useState({});

    const location = useLocation();

    const loadData = () => {
        noteFolderService.getAllByUserId().then((data) => {
            if (data.length >= 0) {
                setNoteFolders(data);
            }
        });
    };
    const loadNoteData = () => {
        noteService.getAllByFolderId(selectedNoteFolderId).then((data) => {
            if (data.length >= 0) {
                setNoteList(data);
            }
        });
    };
    const loadNote = () => {
        noteService.getById(selectedNoteId).then((data) => {
            if (data.id) {
                setSelectedNote(data);
            }
        });
    };
    const loadFolder = () => {
        noteFolderService.getById(selectedNoteFolderId).then((data) => {
            if (data.id) {
                setSelectedFolder(data);
            }
        });
    };

    useEffect(() => {
        loadData();
    }, [location]);

    useEffect(() => {
        if (selectedNoteFolderId) {
            loadNoteData();
            loadFolder();
        } else {
            loadData();
        }
    }, [selectedNoteFolderId]);

    useEffect(() => {
        if (selectedNoteId) {
            loadNote();
        }
    }, [selectedNoteId]);

    const loadAfterDeleteFolder = () => {
        setSelectedFolder();
        setSelectedNoteFolderId();
        loadNoteData();
        loadFolder();
    };

    const navigate = useNavigate();

    return (
        <div className="w-[320px] h-[480px] md:w-[540px] md:h-[520px] bg-white rounded shadow-lg outline outline-slate-200 p-2 flex flex-col overflow-y-auto">
            <>
                {!selectedNoteFolderId ? (
                    <>
                        {noteFolders.length > 0 && <NoteFolderCreateDialog reload={loadData} />}
                        <div className="flex flex-col flex-wrap items-start md:flex-row text-gray-500">
                            {noteFolders.map((noteFolder, index) => {
                                return (
                                    <div key={index} className="p-4 max-w-full">
                                        <div
                                            onClick={(e) => {
                                                setSelectedNoteFolderId(noteFolder.id);
                                            }}
                                            className="p-4 hover:bg-slate-100 max-w-full duration-200 cursor-pointer rounded"
                                        >
                                            <div>
                                                <FontAwesomeIcon icon={faFolder} className="text-5xl" />
                                            </div>
                                            <div className="max-w-[200px] overflow-hidden truncate">
                                                {noteFolder.name}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {noteFolders.length === 0 && (
                                <div className="flex flex-col items-center min-h-full h-full justify-center w-full">
                                    <div>Chưa có thư mục nào, hãy tạo</div>
                                    <div>
                                        <NoteFolderCreateDialog reload={loadData} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <IconButton
                                color="primary"
                                onClick={(e) => {
                                    setSelectedNoteFolderId();
                                }}
                            >
                                <FontAwesomeIcon icon={faLeftLong} />
                            </IconButton>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center">
                            <NoteFolderEditDialog
                                id={selectedNoteFolderId}
                                button={
                                    <div
                                        className="text-gray-500 select-none cursor-pointer hover:text-blue-500"
                                        onClick={(e) => {}}
                                    >
                                        <FontAwesomeIcon icon={faFolder} className="mr-2 text-lg" />
                                        {selectedFolder && selectedFolder.name}
                                    </div>
                                }
                                reload={loadFolder}
                            />
                            <NoteCreateDialog reload={loadNoteData} noteFolderId={selectedNoteFolderId} />
                            {selectedFolder && (
                                <DeleteFolderDialog
                                    folderId={selectedNoteFolderId}
                                    folderName={selectedFolder.name}
                                    reload={loadAfterDeleteFolder}
                                />
                            )}
                        </div>
                        <div className="flex flex-col flex-wrap items-start md:flex-row">
                            {noteList.map((note, index) => {
                                return (
                                    <div key={index} className="p-4 max-w-full">
                                        <div
                                            onClick={(e) => {
                                                openInNewTab('/note/' + note.id);
                                            }}
                                            className="p-4 hover:bg-slate-100 max-w-full duration-200 cursor-pointer rounded"
                                        >
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faFile}
                                                    className="mr-2 text-blue-500 text-5xl"
                                                />
                                            </div>
                                            <div className="max-w-[200px] overflow-hidden truncate">{note.name}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </>
        </div>
    );
}

export default FolderSelectBoard;
