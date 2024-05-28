import { MediaUpload } from '@wordpress/block-editor'
import { useRef, useEffect } from 'react'
import { TextControl } from "@wordpress/components"

function Editor({props, editorActive}) {
    const content = props.attributes
    const titleType = content.titleType
    const accRef = useRef()
    
    useEffect(() => {
        if (editorActive) {
            if (!props.attributes.style) {
                props.setAttributes({ style: 1 })
            }
        }
    }, [editorActive])

    const Levels = () => {
        return (
            <>
                <option value="h1">h1</option>
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="h4">h4</option>
                <option value="h5">h5</option>
                <option value="h6">h6</option>
                <option value="p">p</option>
            </>
        )
    }
    
    const setImg = (url) => {
        fetch(url)
        .then((response) => response.text())
        .then(
            (text) => {
                props.setAttributes({ imageCode: text, image: url})
            }
        )
    }
    
    return (
        editorActive &&
        <>
        <div ref={accRef}>
            <TextControl
                tagName="p"
                placeholder="Titel geöffnet"
                value={props.attributes.titleActive}
                onChange={( value ) => props.setAttributes({titleActive: value}) }
            />
            <div className="is-layout-flex">
                <label>Icon</label>
                <MediaUpload
                    onSelect={( media ) => setImg(media.url)}
                    allowedTypes={ ["image/svg\\+xml"] }
                    multiple={false}
                    render={({ open }) => (
                        <>
                        <div onClick={open} className="tabImage is-layout-flex">
                            {props.attributes.image
                            ? <><figure><img loading="lazy" src={props.attributes.image} alt="" width={props.attributes.width}/></figure><button>Icon ändern +</button></>
                            : <button>Icon hinzufügen +</button>
                            }
                        </div>
                        
                        </>
                    )}
                />
            </div>
            <div className="is-layout-flex">
                <label></label>
                {props.attributes.image &&
                <div class="link" onClick={() => { props.setAttributes({ imageCode: '', image: ''}) }}>Standard-Icon verwenden</div>
                }
            </div>
            <div className="is-layout-flex">
                <label>Headline-Typ</label>
                <select
                onChange={ ( e ) =>  props.setAttributes({titleType: e.target.value}) }
                value={titleType ? titleType : 'p'}
                >
                    <Levels />
                </select>
            </div>
            <div className="is-layout-flex" style={{ marginBottom: '2rem' }}>
                <label>
                    Style
                </label>
                <input type="number" min={1} max={2} value={props.attributes.style} onChange={ ( e ) =>  props.setAttributes({ style: Number(e.target.value)}) }/>
            </div>
            <TextControl
                tagName="p"
                placeholder="Klasse für Titel"
                value={props.attributes.titleClass}
                onChange={( value ) => props.setAttributes({titleClass: value}) }
            />
            <TextControl
                tagName="p"
                placeholder="Klasse für Head"
                value={props.attributes.headClass}
                onChange={( value ) => props.setAttributes({headClass: value}) }
            />
            <TextControl
                tagName="p"
                placeholder="Klasse für Content"
                value={props.attributes.contentClass}
                onChange={( value ) => props.setAttributes({contentClass: value}) }
            />
        </div>
        </>
    )
}

export default Editor