export const getLastSlide = (number, baseLength) => {
    let fullLength = baseLength
    const checkLength = baseLength % number
    if ( checkLength !== 0 ) {
        fullLength = baseLength - checkLength + number
    }
    return fullLength  
}

export const getFullSliderLength = (number, baseLength) => {
    let fullLength = baseLength - number
    const checkLength = baseLength % number
    const rest = number - checkLength
    
    if ( checkLength !== 0 ) {
        fullLength = baseLength - checkLength
    }
    
    return fullLength
}

export const buildSlides = (loopActive, baseContent, sliderRef, layoutNumber) => {
    sliderRef.current.innerHTML = ''
    
    let loopCount = 1
    let countSlides = 0
    
    if (loopActive) {
        loopCount = 3
    }
    for (let i = 0; i < loopCount; i++) {
        let column = 1
        baseContent.forEach((slide, index) => {
            const slideClone = slide.cloneNode(true)
            slideClone.classList.add('slide')
            slideClone.dataset.index = countSlides

            // Set Column-Numbers
            slideClone.style.setProperty('--column', column)
            if (column < layoutNumber) {
                column++
            }
            else {
                column = 1
            }
            
            if ((((i == 1) && (loopCount == 3)) || (loopCount == 1)) && (index < layoutNumber)) {
                if (index < layoutNumber) {
                    slideClone.dataset.active = 'true'
                } 
            } else {
                slideClone.dataset.active = 'false'
            }
            sliderRef.current.append(slideClone)
            countSlides++
        })
    }
}

export const setActiveSlides = (slides, layoutNumber, activeSlide) => {
    slides.forEach(slide => {
        slide.dataset.active = 'false'
    })
    
    let maxSlide = Number(activeSlide) + layoutNumber
    for (let i = activeSlide; i < maxSlide; i++ ) {
        if (slides[i]) {
            slides[i].dataset.active = 'true'
        }
    }
}

export const layout = (props) =>  {
    const attributes = props
    
    let layoutNumber 
    
    if ((window.innerWidth > attributes.device_1) || (attributes.device_1 == '0') || !attributes.device_1) {
        layoutNumber = Number(attributes.layout)
    }
    else if (
        (window.innerWidth <= attributes.device_1) && 
        (
        (window.innerWidth >= attributes.device_2)
        ||
        ((attributes.device_2 == '0') || !attributes.device_2)
        )
    ) {
        layoutNumber = Number(attributes.layout_2)
    } 
    else if (
        (window.innerWidth < attributes.device_2) && attributes.device_3
    ) {
        layoutNumber = Number(attributes.layout_3)
    } 
    else {
        layoutNumber = 1
    }
   
    return layoutNumber
}
    
export const prevSlide = (props) => {
    const newSlide = Number(props.activeSlide) - props.layoutNumber
    if (newSlide >= props.firstSlide) {
        props.setActiveSlide(newSlide.toString())
    }
    else if (props.attributes.animation == 'fade') {
        props.setActiveSlide((props.lastSlide - 1).toString())
    }
    else if (props.loopActive) {       
        props.setActiveSlide( getFullSliderLength(props.layoutNumber, props.baseLength)) 
    } else {
        props.setActiveSlide('0') 
    }
} 
export const nextSlide = (props, loopActive) => {
    const newSlide = Number(props.activeSlide) + props.layoutNumber
    if ((newSlide < props.lastSlide)) {
        props.setActiveSlide(newSlide)
    } 
    else if (
        (props.attributes.animation == 'fade' && !props.autoplayActive) 
        ||
        (props.attributes.animation == 'fade' && props.attributes.loop) 
        )
        {            
            props.setActiveSlide('0')
    }
    else {
        props.setActiveSlide(props.lastSlide)
    }
}

export const goToSlide = (sliderRef, slides, speed, setActiveSlide, slide) => {    
    let timeoutSpeed = speed ? (Number(speed)) : 1000
    setTimeout(() => {
        sliderRef.current.style.transition = 'none'
        sliderRef.current.style.setProperty('--translate', ('-' + slides[slide].offsetLeft + 'px'))
        
        setTimeout(() => {  
            sliderRef.current.style.transition = 'transform ' + (speed / 1000) + 's'
        }, 100)
        setActiveSlide(slide)
        
    }, timeoutSpeed)
}

export const handleScroll = (e, scrollVariables, activatedEvent, setActivatedEvent) => {
    const sliderContainer = scrollVariables.sliderRef.current
    const props = scrollVariables

    if (!activatedEvent) {
        if (e.type == 'touchstart') {
            const touchendListener = (touchend) => {
                setActivatedEvent(true)    
                if (scrollVariables.autoplayActive) {
                    scrollVariables.setAutoplayActive(false)
                }
                if (touchend.changedTouches[0] && e.changedTouches[0]) {
                    if (touchend.changedTouches[0].clientX > e.changedTouches[0].clientX) {
                        prevSlide(props)
                    } else if (touchend.changedTouches[0].clientX < e.changedTouches[0].clientX) {
                        nextSlide(props)
                    }
                    sliderContainer.removeEventListener('touchend', touchendListener);
                }
            }
            sliderContainer.addEventListener('touchend', touchendListener)
        }
        
        if ((e.type == 'wheel')) {
            setActivatedEvent(true)
            if ((e.nativeEvent.deltaX < 0)) {
                prevSlide(props)    
                if (scrollVariables.autoplayActive) {
                    scrollVariables.setAutoplayActive(false)
                }
            }
            else if (e.nativeEvent.deltaX > 0) {
                nextSlide(props)    
                if (scrollVariables.autoplayActive) {
                    scrollVariables.setAutoplayActive(false)
                }
            }
        }
    }
}