import { Suspense } from 'react'
import Header from './Header'
import { useInView } from 'react-intersection-observer'
const Slider = React.lazy(() => import (/* webpackChunkName: "Slider" */ './plugins/Slider'))

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

if (document.querySelector('.wp-block-button')) {
    document.querySelectorAll('.wp-block-button').forEach(buttonWrapper => {
        if (!buttonWrapper.classList.contains('button-noArrow')) {
            buttonWrapper.querySelectorAll('.wp-block-button__link').forEach(button => {
                button.innerHTML = '<span>' + button.innerHTML + '</span><svg xmlns="http://www.w3.org/2000/svg" width="18.16" height="26.42" viewBox="0 0 18.16 26.42"><path d="m4.13,26.42L.01,22.05l9.39-8.85L0,4.37,4.11,0l14.05,13.2-14.03,13.22Z"/></svg>'
            })
        }
    })
}

if (document.querySelector('.list-check')) {
    document.querySelectorAll('.list-check').forEach(list => {
        list.querySelectorAll('li').forEach(li => {
            li.innerHTML = '<span class="check"><svg xmlns="http://www.w3.org/2000/svg" width="29.38" height="22.69" viewBox="0 0 29.38 22.69"><path d="m9.6,16.91l-6.73-6.69-2.87,2.87,9.6,9.6L29.38,2.91l-2.87-2.91L9.6,16.91Z" /></svg></span><span>' + li.innerHTML + '</span>'
        })
    })
}

if (document.querySelector('.spacer-on')) {
    document.querySelectorAll('.spacer-on').forEach(spacer => {
        if ((spacer.tagName.toLowerCase() === 'p')
        || (spacer.tagName.match(/^h[1-6]$/i))) {
            spacer.innerHTML = '<span class="spacer start"></span><span class="content">' + spacer.innerHTML + '</span><span class="spacer ende"></span>'
        } else {
            var spacerElement = document.createElement('span')
            spacerElement.classList.add('spacer')
            spacer.append(spacerElement) 
            if (spacer.classList.contains('wp-block-cover') || spacer.classList.contains('wp-block-group')) {
                spacer.querySelector('div').append(spacerElement) 
            } else {
                spacer.append(spacerElement) 
            }
        }
    })
}

// Gutenberg-Plugins
// aundo-icons
if (document.querySelector(".aundo-icons")) { 
    const divsToUpdate = document.querySelectorAll(".aundo-icons")
    divsToUpdate.forEach(function (div) {
        let nextElement = div.nextElementSibling
        if (nextElement && !div.classList.contains('blockIcon')) {
            if (nextElement.classList.contains("wp-block-buttons")) {
                div.style.display = ""
                nextElement.querySelector(".wp-block-button").prepend(div)
            }
            else {
                div.style.display = "inline-flex"
                nextElement.prepend(div)
            }
        } else if (div.classList.contains('overlap')) {
            div.parentNode.style.marginTop = 'calc(var(--iconSize) / 2)'
        }
    })
}
if (document.querySelector(".aundo-slider")) { 
    const divsToUpdate = document.querySelectorAll(".sliderJS")
    divsToUpdate.forEach(function (div, index) {
        div.id = 'slider' + index
        const data = JSON.parse(div.parentNode.querySelector("pre").innerHTML)
        Object.assign(data)
        wp.element.render( wp.element.createElement( BlockFunction, {props: data, parent: div.parentNode}  ), div )
    })
    function BlockFunction({props, parent}) { 
        return (
        <Suspense fallback={<span class="loading"></span>}><Slider props={props} useInView={useInView} parent={parent}/></Suspense>
        )
}
}
if (document.querySelector('.iconImg')) {
    document.querySelectorAll('.iconImg').forEach(imgParent => {
        const position = imgParent.dataset.position
        const icon = imgParent.querySelector('.imageIcon')
        const img = imgParent.querySelector('img')

        if (icon && img) {
            img.parentNode.insertBefore(icon, img.nextSibling);
            icon.style.display = ''
        }
        
        if (imgParent.querySelector('figcaption')) {
            imgParent.parentNode.insertBefore(imgParent.querySelector('figcaption'), imgParent.nextSibling);
        }

        if ((position == 'moveRight') && imgParent.closest('.wp-block-column')) {
            let parentColumn = imgParent.closest('.wp-block-column')
            if (parentColumn.nextElementSibling) {
                parentColumn.nextElementSibling.style.setProperty('--paddingLeft', window.getComputedStyle(parentColumn.nextElementSibling).paddingLeft);
                parentColumn.nextElementSibling.classList.add('afterIconColumn')
            }
        } /* else if (imgParent.nextElementSibling) {
            imgParent.nextElementSibling.style.setProperty('--paddingLeft', window.getComputedStyle(imgParent.nextElementSibling).paddingLeft);
            imgParent.nextElementSibling.style.setProperty('--paddingTop', window.getComputedStyle(imgParent.nextElementSibling).paddingTop);
        } */
    })
}
// aundo-accordion
if (document.querySelector(".aundo-accordion")) {
    import(/* webpackChunkName: "Accordion" */ './plugins/Accordion').then(frontend => { 
        document.querySelectorAll('.aundo-accordion').forEach(acc => {
            frontend.AccordionJs({acc})
        })       
    })
}