import { Suspense, useEffect } from 'react'
import Header from './Header'
import { useInView } from 'react-intersection-observer'

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      document.querySelector('html').dataset.ready = 'true'
    }
}

const updateHeader = document.querySelector("#headerscript")
const RenderScripts = () => {
    return (
        <>
        <Header />
        </>
    )
}
wp.element.render(
    wp.element.createElement( RenderScripts ),
    updateHeader
)

// Gutenberg-Plugins
