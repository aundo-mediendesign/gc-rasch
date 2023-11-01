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

if (document.querySelector('.buttonLink')) {
    document.querySelectorAll('.buttonLink').forEach(link => {
        link.innerHTML = link.innerHTML + '<svg xmlns="http://www.w3.org/2000/svg" width="18.16" height="26.42" viewBox="0 0 18.16 26.42"><path d="m4.13,26.42L.01,22.05l9.39-8.85L0,4.37,4.11,0l14.05,13.2-14.03,13.22Z"/></svg> '
    })
}

if (document.querySelector('.list-check')) {
    document.querySelectorAll('.list-check').forEach(list => {
        list.querySelectorAll('li').forEach(li => {
            li.innerHTML = '<span class="check"><svg xmlns="http://www.w3.org/2000/svg" width="29.38" height="22.69" viewBox="0 0 29.38 22.69"><path d="m9.6,16.91l-6.73-6.69-2.87,2.87,9.6,9.6L29.38,2.91l-2.87-2.91L9.6,16.91Z" /></svg></span><span>' + li.innerHTML + '</span>'
        })
    })
}

// Gutenberg-Plugins
