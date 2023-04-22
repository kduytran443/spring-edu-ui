import { Avatar } from '@mui/material';
import { renderToTime } from '~/utils';
import MessageContent from './MessageContent';

function ChatMessage({ message = {}, owner = false }) {
    return (
        <div className={`flex flex-col md:flex-row items-start my-4 w-full ${owner ? 'justify-end' : 'justify-start'}`}>
            {!owner && (
                <div className="flex flex-row items-center justify-start mb-2 md:mb-0 md:mr-2">
                    <Avatar src={message?.user.avatar} />
                    <div className="text-blue-600 font-bold md:hidden ml-4">{message?.user.username}</div>
                </div>
            )}
            <div
                className={`flex text-sm md:text-base flex-col p-2 rounded-lg bg-slate-100 shadow ${
                    owner && 'bg-blue-400'
                }`}
            >
                <div className={` font-bold hidden md:block ${owner ? 'text-white' : 'text-blue-500'}`}>
                    {message?.user.username}
                </div>
                <div className={`max-w-full break-all my-2 min-w-full w-full ${owner && 'text-white'}`}>
                    <MessageContent content={message.content} type={message.type} />
                </div>
                <div className={`${owner ? 'text-blue-200' : 'text-gray-500'}`}>{renderToTime(message.date)}</div>
            </div>
        </div>
    );
}

export default ChatMessage;

/*

nienluanctu2023user_b@gmail.com
nienluanctu2023user_a@gmail.com

*/
