
import { MediaUpload } from '@wordpress/block-editor'
import { SelectControl, CheckboxControl } from "@wordpress/components"

function Editor({props, editorActive}) {   
    const setImg = (media) => {
        props.setAttributes({ image: media.url, imageId: media.id })
    }
    
    return (    
        editorActive &&
        <div>            
            <MediaUpload
                onSelect={( media ) => setImg(media)}
                allowedTypes={ ["image/svg\\+xml"] }
                multiple={false}
                render={({ open }) => (
                    <>
                    <div onClick={open} className="tabImage">
                        {props.attributes.image
                        ? <><figure><img loading="lazy" src={props.attributes.image} alt="" width={props.attributes.width}/></figure><button>Bild ändern +</button></>
                        : <button>Icon wählen +</button>
                        }
                    </div>
                    
                    </>
                )}
            />
            <CheckboxControl
                label="Bild stretchen"
                checked={ props.attributes.stretch }
                onChange={ () => props.attributes.stretch ? props.setAttributes({ stretch: false }) : props.setAttributes({ stretch: true }) }
            />
            <SelectControl
                label="Hintergrund-Farbe"
                value={ props.attributes.bgColor }
                options={ [
                    { label: 'Transparent', value: 'bg-trans' },
                    { label: 'Orange', value: 'bg-orange' },
                    { label: 'Gelb', value: 'bg-gelb' },
                    { label: 'Schwarz', value: 'bg-schwarz' },
                    { label: 'Weiß', value: 'bg-weiss' },
                ] }
                onChange={(value) => props.setAttributes({ bgColor: value }) }
            />
            <SelectControl
                label="Position"
                value={ props.attributes.position }
                options={ [
                    { label: 'Rechts vom Bild', value: 'moveRight' },
                    { label: 'Unter dem Bild', value: 'moveBottom' },
                ] }
                onChange={(value) => props.setAttributes({ position: value })}
            />

        </div>
    )
}

export default Editor