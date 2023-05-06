function CustomFilePreview({ fileData = {} }) {
    if (fileData.type.includes('audio')) {
        return (
            <audio
                className="w-full"
                style={{ width: '100%' }}
                controls
                preload="auto"
                autobuffer
                src={fileData.data}
            />
        );
    } else if (fileData.type.includes('video')) {
        return <video src={fileData.data}></video>;
    }

    return <div></div>;
}

export default CustomFilePreview;
