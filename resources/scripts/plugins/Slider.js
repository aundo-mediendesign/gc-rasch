import { layout } from './SliderComponents/functions'
import { useState, useEffect, useRef } from 'react'
import Navigation from './SliderComponents/Navigation'
import { setActiveSlides, handleScroll, getLastSlide, buildSlides, goToSlide, nextSlide } from './SliderComponents/functions'

function Slider({props, parent, useInView}) {  
    const sliderRef = useRef()
    const {ref, inView} = useInView({
        threshold: .75
    })

    const [sliderIsActive, setSliderIsActive] = useState(!props.justmobile ? true : false)
    const [layoutNumber, setLayoutNumber] = useState(false)
    const [activatedEvent, setActivatedEvent] = useState(false)

    const baseContent = parent.querySelector('.wp-block-gallery') ? parent.querySelectorAll('.wp-block-gallery > *') : parent.querySelectorAll('.wp-block-create-block-aundo-slider > *')
    const baseLength = baseContent.length 
    const loopActive = ((props.loop && props.animation == 'scroll')) ? true : false
    const firstSlide = loopActive ? baseLength : "0"
    const fade = (props.animation == 'fade')
    const lastSlide = loopActive ? (baseLength * 2) : fade ? getLastSlide(layoutNumber, baseLength) : (baseLength - layoutNumber)
    
    const [reset, setReset] = useState(true)
    const [autoplayActive, setAutoplayActive] = useState(props.autoplay)
    const [slides, setSlides] = useState()
    const [activeSlide, setActiveSlide] = useState(firstSlide.toString())
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [deactivateNav, setDeactivateNav] = useState((props.arrows || props.pagination) ? false : true)
    const speed = props.speed ? props.speed : 500
    const delay = props.delay ? props.delay : 1000

    const checkSliderActive = (windowSize) => {
        const correctSize = windowSize < props.size
        if (correctSize && !sliderIsActive) {
            setSliderIsActive(true)
        }
        else if (!correctSize && sliderIsActive) {
            setSliderIsActive(false)
        }
    }
    
    // sliderIsActive changed
    // Control WindowSize
    useEffect(() => {
        if ((typeof window !== 'undefined')) {
            function handleResize() {
                setWindowSize(window.innerWidth)
                checkSliderActive(window.innerWidth)
            }
            window.addEventListener("resize", handleResize);
            handleResize();
        
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [sliderIsActive])

    // Set SliderDefaults on every size change
    useEffect(() => {
        if (windowSize && sliderIsActive) {
            const number = layout(props)
            if (layoutNumber !== number) {
                setLayoutNumber(number)
                parent.querySelector('.sliderContent').style.display = 'none'
            }
        } else if (!sliderIsActive && layoutNumber && props.justmobile) {
            setLayoutNumber(false)
            parent.querySelector('.sliderContent').style.display = ''
        }
    }, [sliderIsActive, windowSize])
    
    // LayoutNumber changed // reset
    useEffect(() => {
        if (layoutNumber) {
            buildSlides(loopActive, baseContent, sliderRef, layoutNumber)
            setSlides(parent.querySelectorAll('.slide'))
            setActiveSlide(firstSlide.toString())

            // Scroll to first Slide
            sliderRef.current.style.transition = 'none'
            sliderRef.current.style.setProperty('--translate', ('-' + parent.querySelectorAll('.slide')[Number(firstSlide)].offsetLeft + 'px'))

            setTimeout(() => {
                if (sliderRef.current) {
                    sliderRef.current.style.transition = 'transform ' + (speed / 1000) + 's ease-out'
                }
            }, 100)
            // }
        }
    }, [layoutNumber, sliderRef.current])
    
    useEffect(() => {
        if (activeSlide && slides) {
            setActiveSlide(Number(activeSlide))
            setActiveSlides(slides, layoutNumber, Number(activeSlide))
            sliderRef.current.style.setProperty('--translate', ('-' + parent.querySelectorAll('.slide')[Number(activeSlide)].offsetLeft + 'px'))
        }
    }, [activeSlide])
    useEffect(() => {
        if (loopActive && (Number(activeSlide) >= lastSlide) || (Number(activeSlide) < firstSlide)) {
            const newSlide = (Number(activeSlide) >= lastSlide) ? (Number(activeSlide) - baseLength) : (Number(activeSlide) + baseLength)
            setDeactivateNav(true)
            goToSlide(sliderRef, slides, speed, setActiveSlide, newSlide)
            // setDeactivateNav(false)
        } else if (deactivateNav) {
            setDeactivateNav(false)
        }
    }, [activeSlide])

    const componentProps = {
        baseLength: baseLength,
        layoutNumber: layoutNumber,
        attributes: props,
        activeSlide: activeSlide, 
        setActiveSlide: (e) => setActiveSlide(e),
        slides: slides,
        sliderRef: sliderRef,
        lastSlide: lastSlide,
        autoplayActive: autoplayActive,
        setAutoplayActive: (e) => setAutoplayActive(e),
        firstSlide: firstSlide,
        deactivateNav: deactivateNav,
        loopActive: loopActive,
        inView: inView,
        delay: props.delay,
        speed: speed
    } 

    useEffect(() => {
        if (activatedEvent) {
            setTimeout(() => {
                setActivatedEvent(false)
            }, speed)
        }
    }, [activatedEvent])
    
    const [autoplayStarted, setAutoplayStarted] = useState(false)

    useEffect(() => {
        let interval
        if (inView && autoplayActive) {
            if (!autoplayStarted) {
                interval = setInterval(() => {
                    nextSlide(componentProps, loopActive)
                    setAutoplayStarted(true)
                }, Number(delay) / 2);
                
                return () => clearInterval(interval);
            } else {
                interval = setInterval(() => {
                    nextSlide(componentProps, loopActive)
                }, Number(delay) + (Number(speed) / 2));
    
                return () => clearInterval(interval);
            }
        } 
    }, [activeSlide, inView, autoplayActive, autoplayStarted])

    return (
        layoutNumber
        &&
        <>
        {((props.arrows || props.pagination) && slides &&
            <Navigation props={componentProps} />
        )
        }
        <div
        className="sliderContainer" 
        ref={ref}
        onWheel={(e) => handleScroll(e, componentProps, activatedEvent, setActivatedEvent)}
        onTouchStart={(e) => handleScroll(e, componentProps, activatedEvent, setActivatedEvent)}
        >
            <div 
            className="slider" 
            ref={sliderRef}
            data-active={activeSlide}
            onClick={() => autoplayActive && setAutoplayActive(false)}
            style={{ 
                '--layoutNumber': layoutNumber,  
                overflow: "visible", 
            }}
            >
            </div>
        </div>
        </>
    )
}

export default Slider