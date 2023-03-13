import { Button, FormGroup } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';

function RichTextEditor() {
    const modulesQill = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
        history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
        },
        imageResize: {
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
        },
    };
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    const [text, setText] = useState('');
    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div>
            <FormGroup controlId="editor">
                <ReactQuill
                    value={text}
                    onChange={handleChange}
                    modules={modulesQill}
                    formats={formats}
                    placeholder={'Enter new content here...'}
                    style={{ height: '300px' }}
                />
            </FormGroup>
            <div className="btnSubmit">
                <Button>Submit</Button>
            </div>
        </div>
    );
}

export default RichTextEditor;
