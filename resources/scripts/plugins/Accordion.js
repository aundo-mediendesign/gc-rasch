export function AccordionJs({acc}) {
    let firstOpen = true

    function isInViewport(element) {
        const bounding = element.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
    const showHideContent = (e) => {
        if (acc.dataset.active == "true") {
            acc.dataset.active = "false"
        } else {
            if (document.querySelector('.aundo-accordion[data-active="true"]')) {
                document.querySelector('.aundo-accordion[data-active="true"]').dataset.active = "false"

                setTimeout(() => {
                    if (!isInViewport(acc)) {
                        acc.scrollIntoView()
                    }
                }, 600 )
            }
            acc.dataset.active = "true"
        }
    }
    const onClickOutside = (target) => {
        if (
            !target.closest('.aundo-accordion')    
        ) {
            acc.dataset.active = "false"
            document.removeEventListener("click", onClickOutside)
        }
    }

    acc.querySelector('.accHead').addEventListener('click', showHideContent)
    
    acc.addEventListener('mouseenter', () => {
        document.removeEventListener("click", onClickOutside)
    })
    acc.addEventListener('mouseleave', () => {
        document.addEventListener("click", (e) => onClickOutside(e.target))
    })

    const changeMaxHeightToContentHeight = (event) => {
        if ((acc.dataset.active == 'true') && firstOpen) {
            acc.querySelector('.accContent').style.maxHeight = '100%'
            acc.style.setProperty('--maxHeight', acc.querySelector('.accContent').offsetHeight + 'px')
            acc.querySelector('.accContent').style.maxHeight = ''
            firstOpen = false
            event.target.removeEventListener('transitionend', changeMaxHeightToContentHeight)
        }
    }

    acc.querySelector('.accContent').addEventListener('transitionend', changeMaxHeightToContentHeight)

    if (acc.closest(".wp-block-columns")) {
        acc.closest(".wp-block-columns").classList.add("accColumns")
    }


}