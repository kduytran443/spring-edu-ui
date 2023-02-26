function CustomVideoPlayer({
    src = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    type = 'video/mp4',
    poster = 'https://blog.asana.com/wp-content/post-images/1-1-meetings-Article-Image-1024x655.png',
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
