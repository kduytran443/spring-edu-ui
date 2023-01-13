import images from '~/assets/images';

function Logo({ shape = 'default', size = 'medium' }) {
    return (
        <div className="w-full">
            <img className="w-full" src={images.logo} alt="logo" />
        </div>
    );
}

export default Logo;
