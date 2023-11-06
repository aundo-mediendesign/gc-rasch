import { useRef, useState } from 'react'
import { generateEditWindow } from '../../../functions.js'
import Editor from './Editor'
import { InnerBlocks } from '@wordpress/block-editor'

function BackendComponent({props}) {
    const blockRef = useRef()
    const contentRef = useRef()
    const [editorActive, setEditorActive] = useState(false)   

    const IB_TEMPLATE = [
        [ 'core/image' ]
    ]

    return (
        <div ref={blockRef} data-name="aundo-iconImg" class="parent-aundo aundo-iconImg" >
            <div ref={contentRef} className="windowContent" style={{ display: 'none'}}>
                <Editor props={props} editorActive={editorActive} />
            </div>
            <button onClick={() => generateEditWindow(blockRef.current, contentRef.current, setEditorActive)} class="edit">
                <p style={{ fontSize: '.6rem' }}>Bild-Icon</p>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </div>
            </button>
            <InnerBlocks
                template={IB_TEMPLATE}
            />
         </div>
    )
} 

export default BackendComponent