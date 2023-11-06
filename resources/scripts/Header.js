import { useState, useEffect } from 'react'
import { useScrollDirection } from 'react-use-scroll-direction'
// Header aundo
function Header() {
    const headerRef = document.querySelector(".header")
    const burger = document.querySelector(".burger")
    const parents = document.querySelectorAll(".menu-item-has-children")
    const colorSwitchIcons = document.querySelectorAll(".colorSwitch_icon")
    const [navStatus, setNavStatus] = useState("closed")
    const [switchColors, setColors] = useState(false)
    const [size, setSize] = useState()
    const [headerStatus, setHeaderStatus] = useState('ontop')
    headerRef.dataset.status = navStatus

    if (!switchColors) {
        if (localStorage.getItem("colors")) {
            document.querySelector("#body").classList.remove('lightmode')
            document.querySelector("#body").classList.add(localStorage.getItem("colors"))
            setColors(localStorage.getItem("colors"))
        }
    }
    
    const openNav = (e) => {
        if (e !== 'escapekey') {
            if (e.target.closest(".header").dataset.status == "open") {
                setNavStatus("closed")
                document.querySelector("body").style.overflow = ""
            }
            else {
                setNavStatus("open")
                document.querySelector("body").style.overflow = "hidden"
                document.querySelector("body").style.maxHeight = "var(--windowHeight)"
            }
        }
        else {
            setNavStatus("closed")
            document.querySelector("body").style.overflow = ""
            document.querySelector("body").style.maxHeight = ""
        }
    }

    const { 
        isScrolling,
        isScrollingUp, 
        isScrollingDown,
    } = useScrollDirection()

    const changeColors = () => {
        if (document.querySelector("#body").classList.contains("darkmode")) {
            document.querySelector("#body").classList.remove("darkmode")
            document.querySelector("#body").classList.add("lightmode")
            setColors("lightmode")
            localStorage.setItem("colors", "lightmode")
            document.cookie = "colors=lightmode"
        }
        else {
            document.querySelector("#body").classList.remove("lightmode")
            document.querySelector("#body").classList.add("darkmode")
            setColors("darkmode")
            localStorage.setItem("colors", "darkmode")
            document.cookie = "colors=darkmode"
        }
        document.querySelector("#body").classList.remove("lightmodePreview")
        document.querySelector("#body").classList.add("darkmodePreview")
        hidePreview()
    }

    const showPreview = () => {
        document.querySelector("#body").classList.add('transition')
        if (document.querySelector("#body").classList.contains("darkmode")) {
            document.querySelector("#body").classList.remove("darkmodePreview")
            document.querySelector("#body").classList.add("lightmodePreview")
            showHeader()
        }
        else {
            document.querySelector("#body").classList.remove("lightmodePreview")
            document.querySelector("#body").classList.add("darkmodePreview")
            showHeader()
        }
    }

    const hidePreview = () => {
        document.querySelector("#body").classList.add('transition')
        document.querySelector("#body").classList.remove("darkmodePreview")
        document.querySelector("#body").classList.remove("lightmodePreview")
        showHeader()
    }

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
    const checkScrollDirection = () => {
        if (isScrolling) {
            // if ((window.scrollY < 100) && (headerStatus !== 'ontop')) {
            //     setHeaderStatus('ontop')
            //     showHeader(true)
            // }
            
            if (isScrollingUp && (window.scrollY >= 100) && (headerStatus !== 'show')) {
                setHeaderStatus('show')
                showHeader()
            }
            // checkScrollDown()
            if (isScrollingDown && (navStatus !== "open") && (window.scrollY !== 0) && (headerStatus !== 'hide')) {
                setHeaderStatus('hide')
                hideHeader()
            }
        } else if ((!isScrolling) && (window.scrollY < 100)) {
            setHeaderStatus('ontop')
            showHeader(true)
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
    
    function removeEventListeners() {
        colorSwitchIcons.forEach((icon) => {
          icon.removeEventListener("click", changeColors);
          icon.removeEventListener("mouseenter", showPreview);
          icon.removeEventListener("mouseleave", hidePreview);
        });
    
        document.removeEventListener("keydown", handleKeyDown);
    
        burger.removeEventListener("click", handleClick);
    }
    function setupListeners() {
        colorSwitchIcons.forEach(icon => {
            icon.addEventListener("click", changeColors);
            icon.addEventListener("mouseenter", showPreview);
            icon.addEventListener("mouseleave", hidePreview);
        })
        document.addEventListener('keydown', handleEscapeKey);
        burger.addEventListener("click", handleBurgerClick);
        parents.forEach(setInitialMenuState);
        setWindowDimensions();
    }
    
    const [disableShowHeader, setDisableShowHeader] = useState(false)

    useEffect(() => {            
        const disableHeader = () => {
            setDisableShowHeader(true)
            setTimeout(() => {
                setDisableShowHeader(false)
            }, 1500)
        }
        if (!disableShowHeader) {
            checkScrollDirection()
            document.addEventListener('click', disableHeader)
        } 
        return () => {
            document.removeEventListener('click', disableHeader)
        }
    }, [isScrolling, window.scrollY, navStatus, headerStatus, disableShowHeader])  
    
    useEffect(() => {
        setupListeners()
        return () => {
            removeEventListeners()
        }
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

        // if (size > 819) {
        //     parents.forEach(parent => {
        //         parent.dataset.status = "open"
        //         parent.removeEventListener("click", clickHandler)
        //         // parent.addEventListener("mouseenter", mouseenterHandler)
        //         // parent.addEventListener("mouseleave", mouseleaveHandler)
        //     })
        //     // return () => {
        //     //     parents.forEach((parent) => {
        //     //         parent.removeEventListener("mouseenter", mouseenterHandler);
        //     //         parent.removeEventListener("mouseleave", mouseleaveHandler);
        //     //     })
        //     // }
        // }
        // if (size <= 819) {
        // }
        parents.forEach(parent => {
            parent.dataset.status = "open"
            // parent.removeEventListener("mouseenter", mouseenterHandler)
            // parent.removeEventListener("mouseleave", mouseleaveHandler)
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
