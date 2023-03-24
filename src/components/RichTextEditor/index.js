import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect } from 'react';
import { useRef } from 'react';
import parse from 'html-react-parser';
import { useState } from 'react';

function RichTextEditor({ data, readOnly, setData = (e) => {}, disabled = false }) {
    const editorRef = useRef();
    const [dataState, setDataState] = useState(data);

    const checkOnLoad = () => {
        if (disabled) {
            const toolbar = editorRef.current.getElementsByClassName('ck-editor__top')[0];
            toolbar.style.display = 'none';
        }
    };

    const editorConfiguaration = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                'alignment',
                'code',
                'codeBlock',
                'findAndReplace',
                'fontColor',
                'fontFamily',
                'fontSize',
                'fontBackgroundColor',
                'highlight',
                'horizontalLine',
                'htmlEmbed',
                'imageInsert',
            ],
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
            ],
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
        isReadOnly: true,
    };

    const [removeConfig, setRemoveConfig] = useState({
        removePlugins: ['Markdown'],
    });

    if (disabled && !removeConfig.removePlugins.includes('toolbar')) {
        const arr = [...removeConfig.removePlugins];
        arr.push('toolbar');
        setRemoveConfig((pre) => {
            return {
                removePlugins: arr,
            };
        });
    }

    return (
        <div ref={editorRef}>
            <CKEditor
                editor={Editor}
                disabled={disabled}
                data={dataState}
                onReady={(editor) => {
                    const data = editor.getData();
                    setData(data);
                }}
                config={removeConfig}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                }}
                onBlur={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                }}
                onFocus={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                }}
            />
        </div>
    );
}

export default RichTextEditor;

/*
    const editorConfiguaration = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                'alignment',
                'code',
                'codeBlock',
                'findAndReplace',
                'fontColor',
                'fontFamily',
                'fontSize',
                'fontBackgroundColor',
                'highlight',
                'horizontalLine',
                'htmlEmbed',
                'imageInsert',
            ],
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
            ],
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
        isReadOnly: true,
    };
    */
