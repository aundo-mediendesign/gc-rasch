// 2.0
import { useState, useEffect } from 'react'
import { useScrollDirection } from 'react-use-scroll-direction'

// Header aundo
function Header() {
    const headerRef = document.querySelector(".header")
    const burger = document.querySelector(".burger")
    const parents = document.querySelectorAll(".menu-item-has-children")
    const [navStatus, setNavStatus] = useState("closed")
    const [size, setSize] = useState()
    const [headerStatus, setHeaderStatus] = useState('ontop')
    headerRef.dataset.status = navStatus

    const openNav = (e) => {
        if (e !== 'escapekey') {
            if (e.target.closest(".header").dataset.status == "open") {
                setNavStatus("closed")
                document.querySelector("body").style.overflow = ""
                // document.querySelector("body").style.maxHeight = ""
            }
            else {
                setNavStatus("open")
                document.querySelector("body").style.overflow = "hidden"
                // document.querySelector("body").style.maxHeight = "var(--windowHeight)"
            }
        }
        else {
            setNavStatus("closed")
            document.querySelector("body").style.overflow = ""
            // document.querySelector("body").style.maxHeight = ""
        }
    }

    const { 
        isScrolling,
        isScrollingUp, 
        isScrollingDown,
    } = useScrollDirection()


    const hideHeader = () => {
        headerRef.classList.add("hidden")
        headerRef.classList.remove("ontop")
        headerRef.classList.remove("visible")
    }
    const showHeader = (ontop) => { 
        headerRef.classList.remove("hidden")
        if (!ontop) {
            headerRef.classList.remove("ontop")
        } else {
            headerRef.classList.add("ontop")
        }
        headerRef.classList.add("visible")
    }

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        // Clean-up-Funktion, um den Event-Listener zu entfernen
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const checkScrollDirection = () => {
        if (isScrolling) {
            if ((scrollY < 100) && (headerStatus !== 'ontop') && !disableShowHeader) {
                setHeaderStatus('ontop')
                showHeader(true)
            }
            else if (isScrollingUp && (scrollY >= 100) && (headerStatus !== 'show') && (headerStatus !== 'ontop') && !disableShowHeader) {
                setHeaderStatus('show')
                showHeader()
            }
            // checkScrollDown()
            if (isScrollingDown && (navStatus !== "open") && (scrollY !== 0) && (headerStatus !== 'hide') && !disableShowHeader) {
                setHeaderStatus('hide')
                hideHeader()
            }
        }
    } 

    function handleEscapeKey(evt) {
        if (evt.key === 'Escape') {
            openNav('escapekey');
        }
    }
    function handleBurgerClick(e) {
        openNav(e, "click");
    }
    function setInitialMenuState(parent) {
        parent.querySelector("a").innerHTML = '<span>' + parent.querySelector("a").innerHTML + '</span><svg class="openIcon" xmlns="http://www.w3.org/2000/svg" width="39.31" height="25.01" viewBox="0 0 39.31 25.01"><path d="m19.67,25.01L0,4.13,4.37.02l15.3,16.23L34.93,0l4.37,4.11-19.63,20.9Z"/></svg>';
        parent.dataset.status = "open";
    }
    
    function setWindowDimensions() {
        document.querySelector("body").style.setProperty('--windowHeight', document.documentElement.clientHeight + 'px');
        document.querySelector("body").style.setProperty('--windowWidth', document.documentElement.clientWidth + 'px');
    }
    
    function setupListeners() {
        document.addEventListener('keydown', handleEscapeKey);
        burger.addEventListener("click", handleBurgerClick);
        parents.forEach(setInitialMenuState);
        setWindowDimensions();
    }
    
    const [disableShowHeader, setDisableShowHeader] = useState(false)
  
    const mainElement = document.querySelector('main.main')      
    useEffect(() => {   
        const disableHeader = (e) => {
            console.log('clickHideHeader disableHeader')
            setDisableShowHeader(true)
            if (navStatus !== "open") {
                setHeaderStatus('hide')
                hideHeader()
            }
        }
        const enableHeader = (e) => {
            console.log('clickHideHeader enableHeader')
            setTimeout(() => {
                setDisableShowHeader(false)
            }, 1500)
        }    
        const clickHideHeader = () => {
            console.log('clickHideHeader')
            disableHeader()
            enableHeader()
        }
        const touchHideHeader = (e) => {
            if (e.target.closest('.aundo-slider')) {
                console.log('touch hide header')
                disableHeader()
            } else {
                enableHeader()
            }
        }
        checkScrollDirection()
        mainElement.addEventListener('click', clickHideHeader)

        // Touchmove auf Slider
        mainElement.addEventListener('touchstart', (e) => touchHideHeader(e), {passive: true})
        
        return () => {
            mainElement.removeEventListener('click', clickHideHeader)
            mainElement.removeEventListener('touchstart', (e) => touchHideHeader(e), {passive: true})
        }
    }, [scrollY, navStatus, headerStatus, disableShowHeader])  
    
    useEffect(() => {
        setupListeners()
    }, [])

    useEffect(() => {
        if (size) {
            setWindowDimensions()
        }
        const openClose = (e, listener) => {
            if (listener == "click") {
                parents.forEach(parent => {
                    if (parent !== e.target) {
                        parent.dataset.status = "closed"
                    }
                })
            }
            if (e.target.dataset.status == "open") {
                e.target.dataset.status = "closed"
            }
            else {
                e.target.dataset.status = "open"
            }
        }    
        const mouseenterHandler = (e) => openClose(e)
        const mouseleaveHandler = (e) => openClose(e)
        const clickHandler = (e) => openClose(e, "click")

        parents.forEach(parent => {
            parent.dataset.status = "open"
            parent.addEventListener("click", clickHandler)
        })
        return () => {
            parents.forEach((parent) => {
                parent.removeEventListener("click", clickHandler);
            })
        }
    }, [size])
    
    useEffect(() => {
        function handleResize() {
            setSize(document.documentElement.clientWidth)
        }
        if ((typeof window !== 'undefined')) {
            window.addEventListener("resize", handleResize);
        
            handleResize();
        
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [])

    return false
  
}

export default Header
