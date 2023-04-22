import images from '~/assets/images';

function MessageContent({ content = '', type = 'text' }) {
    let fileContent = '';
    if (type.includes('file')) {
        if (content.includes('image/')) {
            fileContent = <img className="w-full" alt="file" src={content} />;
        } else if (content.includes('compressed/')) {
            fileContent = <img className="w-[100px]" alt="file" src={images.zip} />;
        } else if (content.includes('audio/')) {
            fileContent = <audio className="w-full" alt="file" src={content} />;
        } else if (content.includes('video/')) {
            fileContent = (
                <video controls className="w-full">
                    <source src={content} />
                </video>
            );
        } else {
            fileContent = <img className="w-[100px]" alt="file" src={images.file} />;
        }
    } else if (type.includes('text')) {
        fileContent = content;
    } else {
        fileContent = <img className="w-full" alt="file" src={images.file} />;
    }

    return <div className="w-full">{fileContent}</div>;
}

export default MessageContent;
