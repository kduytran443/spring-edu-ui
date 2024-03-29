import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect } from 'react';
import { useRef } from 'react';
import parse from 'html-react-parser';
import { useState } from 'react';

function NewRichTextEditor({ data, setData = (e) => {}, disabled = false }) {
    const editorRef = useRef();
    const [dataState, setDataState] = useState(data);

    useEffect(() => {
        setDataState(data);
    }, [data]);

    const getTextData = () => {
        const content = editorRef.current.getElementsByClassName('ck-restricted-editing_mode_standard')[0];
        if (content) {
            setData(content.innerHTML);
        }
    };

    const checkOnLoad = () => {
        if (disabled) {
            const toolbar = editorRef.current.getElementsByClassName('ck-editor__top')[0];
            toolbar.style.display = 'none';
        }
    };

    return (
        <div ref={editorRef}>
            <CKEditor
                editor={Editor}
                disabled={disabled}
                data={dataState}
                onReady={(editor) => {
                    checkOnLoad();
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    getTextData();
                }}
                onBlur={(event, editor) => {
                    getTextData();
                }}
                onFocus={(event, editor) => {
                    getTextData();
                }}
            />
        </div>
    );
}

export default NewRichTextEditor;
