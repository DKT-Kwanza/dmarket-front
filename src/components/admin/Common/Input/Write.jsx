import React, { Component} from 'react';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { bucketURL, bucketToken } from "../../../../Api";
import { v4 } from 'uuid';

Quill.register("modules/imageResize", ImageResize);

class Write extends Component {
    constructor(props) {
        super(props);
        this.quillRef = React.createRef();
    }

    componentDidMount() {
        this.attachImageHandler();
    }

    attachImageHandler = () => {
        const quillEditor = this.quillRef.getEditor();
        const toolbar = quillEditor.getModule("toolbar");
        toolbar.addHandler("image", this.handleImage);
    };

    handleImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const inquiryImgURL = `${bucketURL}${v4()}.${file.type.split('/')[1]}`; 
    
                try {
                    await axios.put(inquiryImgURL, file, {
                        headers: {
                            'X-Auth-Token': bucketToken,
                            'Content-Type': file.type
                        }
                    });
    
                    const editor = this.quillRef.getEditor();
                    const range = editor.getSelection();
                    editor.insertEmbed(range.index, 'image', inquiryImgURL);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };
    }
    
    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
        ],
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
        },
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    render() {
        const { value, onChange } = this.props;
        return (
            <div style={{ height: "650px", width: "100%" }}>
                <ReactQuill
                    ref={(el) => { this.quillRef = el }}
                    style={{ height: "600px" }}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={value || ''}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                />
            </div>
        );
    }
}

export default Write;
