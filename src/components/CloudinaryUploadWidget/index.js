import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

function CloudinaryUploadWidget() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const [fileState, setFileState] = useState();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'dr5ah0ima',
                uploadPreset: 'sewipx6o',
            },
            (error, result) => {
                console.log(result);
            },
        );
    }, []);

    return (
        <div>
            <Button
                onClick={() => {
                    widgetRef.current.open();
                }}
            >
                Upload
            </Button>
            <div></div>
        </div>
    );
}

export default CloudinaryUploadWidget;
