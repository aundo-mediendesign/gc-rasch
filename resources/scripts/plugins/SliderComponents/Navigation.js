import { useState, useEffect } from 'react'
import { autoplay, nextSlide, prevSlide } from './functions'

function Navigation({props}) {
    const [hideNext, setHideNext] = useState(false)
    const [hidePrev, setHidePrev] = useState(false)

    // Build Pagination
    const elements = [];

    if (props.attributes.pagination) {
        const fillUp = props.baseLength % props.layoutNumber
        const itemsLength = fillUp ? props.baseLength - fillUp + props.layoutNumber : props.baseLength
        const pagItems = itemsLength / props.layoutNumber

        for (let i = 0; i < pagItems; i++) {
                let id = i * props.layoutNumber
                if (id > props.lastSlide) {
                    id = props.lastSlide
                }
                
                let dataId = props.loopActive ? (id + props.baseLength) : id
                let style
                if (!props.loopActive && (dataId > props.lastSlide )) {
                    style = {display: 'none'}
                }
                let active = 'false'
                if (
                    (dataId == props.activeSlide) ||
                    ((props.activeSlide < props.firstSlide) && (i == (pagItems - 1))) ||
                    ((props.activeSlide > props.lastSlide) && (i == 0))
                ) {
                    active = 'true'
                }
                elements.push(<a key={i} style={style} onClick={(e) => paginate(Number(e.target.dataset.id))} class="paginationPoint" data-id={dataId} data-active={active}></a>);
            // }
        }
    }
    
    useEffect(() => {
        if (!props.loopActive && (props.attributes.animation == 'scroll')) {
            if (!hidePrev && (props.activeSlide <= 0)) {
                setHidePrev(true)
            } 
            else if (hidePrev && (props.activeSlide > 0)) {
                setHidePrev(false)
            }
        }
    }, [props.activeSlide, hidePrev])

    useEffect(() => {
        if (!props.loopActive && (props.attributes.animation == 'scroll')) {
            if (!hideNext && (props.activeSlide >= props.lastSlide)) {
                setHideNext(true)
            } 
            else if (hideNext && (props.activeSlide < props.lastSlide)) {
                setHideNext(false)
            }
        }
    }, [props.activeSlide, hideNext])

    const paginate = (slide) => {
        props.setAutoplayActive(false)
        props.setActiveSlide(slide.toString())
    }

    const getNext = () => {
        props.setAutoplayActive(false)
        nextSlide(props, props.loopActive)
    }   

    const getPrev = () => {
        props.setAutoplayActive(false)
        prevSlide(props)
    }   


    return (
        <div class="nav flex alignCenter justifyCenter">
            {props.attributes.arrows && 
            <a className="arrow prev" 
            onClick={ () => !hidePrev && getPrev()}
            style={
                (hidePrev) 
                ? 
                { opacity: .5, pointerEvents: 'none' } 
                :
                props.deactivateNav
                ?
                { pointerEvents: 'none' } 
                : { opacity: 1 }
            }
            >
                <svg width="78" height="78" viewBox="0 0 78 78"><path d="M52.77,29.59l4.23,4.23-18,18-18-18,4.23-4.23,13.77,13.74,13.77-13.74Zm25.23,9.41c0,21.54-17.46,39-39,39h-.03C17.86,77.98,.68,61.19,.03,40.23c-.01-.41-.03-.82-.03-1.23s.02-.82,.03-1.23C.68,16.81,17.86,.02,38.97,0h.03c21.54,0,39,17.46,39,39Zm-4,0c0-19.3-15.7-35-35-35S4,19.7,4,39s15.7,35,35,35,35-15.7,35-35Z"></path></svg>
            </a>
            }
            {props.attributes.pagination && 
            <div className="pagination flex alignCenter"
            style={
                props.deactivateNav ? { pointerEvents: 'none' } : { opacity: 1 }
            }
            >{elements}</div>
            } 
            {props.attributes.arrows && 
            <a className="arrow next" 
            onClick={ () => !hideNext && getNext()}
            style={
                (hideNext) 
                ? 
                { opacity: .5, pointerEvents: 'none' } 
                :
                props.deactivateNav
                ?
                { pointerEvents: 'none' } 
                : { opacity: 1 }
            }
            >
                <svg width="78" height="78" viewBox="0 0 78 78"><path d="M52.77,29.59l4.23,4.23-18,18-18-18,4.23-4.23,13.77,13.74,13.77-13.74Zm25.23,9.41c0,21.54-17.46,39-39,39h-.03C17.86,77.98,.68,61.19,.03,40.23c-.01-.41-.03-.82-.03-1.23s.02-.82,.03-1.23C.68,16.81,17.86,.02,38.97,0h.03c21.54,0,39,17.46,39,39Zm-4,0c0-19.3-15.7-35-35-35S4,19.7,4,39s15.7,35,35,35,35-15.7,35-35Z"></path></svg>
            </a>
            }
        </div>
    )
}

export default Navigation