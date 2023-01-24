function CustomVideoPlayer({
    src = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    type = 'video/mp4',
    poster = 'https://venturebeat.com/wp-content/uploads/2014/05/lord-of-the-rings-shadow-of-mordor.jpg?w=1200&strip=all',
}) {
    return (
        <div className="rounded-lg overflow-hidden shadow-md">
            <video poster={poster} controls className="w-full">
                <source src={src} type={type} />
            </video>
        </div>
    );
}

export default CustomVideoPlayer;
