import { useRef } from 'react'
import { CheckboxControl } from "@wordpress/components"

function BackendComponent({props}) {
    const blockRef = useRef()

    return (
        <div ref={blockRef} data-name="aundo-spacer" class="parent-aundo aundo-spacer" >
             <CheckboxControl
                label="Rechts ausrichten"
                checked={ props.attributes.alignRight }
                onChange={ () => props.attributes.alignRight ? props.setAttributes({ alignRight: false }) : props.setAttributes({ alignRight: true }) }
            />
             <CheckboxControl
                label="Nicht überlappen / oben überlappen"
                checked={ props.attributes.stopOverlap }
                onChange={ () => props.attributes.stopOverlap ? props.setAttributes({ stopOverlap: false }) : props.setAttributes({ stopOverlap: true }) }
            />
            <span className="spacer"></span>
         </div>
    )
} 

export default BackendComponent