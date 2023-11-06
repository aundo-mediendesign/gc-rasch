import { useRef, useEffect } from 'react'
import { MediaUpload } from '@wordpress/block-editor'
import { CheckboxControl } from "@wordpress/components"

function BackendComponent({props}) {
    const blockRef = useRef()
    useEffect(() => {
        if (blockRef.current) {
            if (!props.attributes.block) {
                    blockRef.current.parentNode.style.float = 'left'
                    blockRef.current.parentNode.style.marginTop = 0
                    blockRef.current.parentNode.style.marginBottom = 0
                    blockRef.current.parentNode.style.marginRight = '1rem'
                    blockRef.current.parentNode.style.zIndex = '999'
                    if (blockRef.current.parentNode.nextElementSibling) {
                        blockRef.current.parentNode.nextElementSibling.style.minHeight = '90px'
                    }
            }
            else {
                blockRef.current.parentNode.style.float = 'unset'
                blockRef.current.parentNode.style.marginTop = ''
                blockRef.current.parentNode.style.marginBottom = ''
                blockRef.current.parentNode.style.marginRight = ''
                if (blockRef.current.parentNode.nextElementSibling) {
                    blockRef.current.parentNode.nextElementSibling.style.minHeight = ''
                }
            }
        }
    }, [props.attributes.block, blockRef.current])

    const setImg = (media) => {
        props.setAttributes({ image: media.url, imageId: media.id })
    }
    
    return (
        <div ref={blockRef} class="parent-aundo aundo-icons" style={{ width: 'fit-content', minWidth: "50px", paddingRight: '3rem' }} data-name="aundo-icons">  
            <MediaUpload
                onSelect={( media ) => setImg(media)}
                allowedTypes={ ["image/svg\\+xml"] }
                multiple={false}
                render={({ open }) => (
                    <>
                    <div onClick={open} className="tabImage">
                        {props.attributes.image
                        ? <><figure style={{ marginBottom: '.5rem' }}><img loading="lazy" src={props.attributes.image} alt="" width={'50px'}/></figure></>
                        : <button style={{ marginBottom: '.5rem' }}>Icon auswählen +</button>
                        }
                    </div>
                    
                    </>
                )}
            />
            <CheckboxControl
                label="block"
                checked={ props.attributes.block }
                onChange={ () => props.attributes.block ? props.setAttributes({ block: false }) : props.setAttributes({ block: true }) }
            />
            <CheckboxControl
                label="Oben Überlappen"
                checked={ props.attributes.overlap }
                onChange={ () => props.attributes.overlap ? props.setAttributes({ overlap: false }) : props.setAttributes({ overlap: true }) }
            />
        </div>
    )
}

export default BackendComponent