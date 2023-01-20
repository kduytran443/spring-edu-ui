import { useRef } from 'react';

function ImageUploader({ width = '', onInput = () => {} }) {
    const imageUploaderRef = useRef();

    const uploadImage = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    onInput(reader.result);
                    imageUploaderRef.current.value = null;
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    return (
        <div>
            <input ref={imageUploaderRef} type={'file'} className="h-full" onChange={uploadImage} />
        </div>
    );
}

export default ImageUploader;
