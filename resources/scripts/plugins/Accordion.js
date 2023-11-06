export function AccordionJs({acc}) {
    const accordionContainer = acc
    const showHideContent = (e) => {
        let y
        if (accordionContainer.dataset.active == "true") {
            accordionContainer.dataset.active = "false"
            // if (acc.previousElementSibling) {
            //     y = acc.previousElementSibling.getBoundingClientRect().top + window.pageYOffset;
            // } else {
            //     y = acc.getBoundingClientRect().top + window.pageYOffset;
            // }
            // window.scrollTo({top: y})
            // setTimeout(() => {
            //     accordionContainer.dataset.active = "false"
            // }, 300)
        }
        else {
            accordionContainer.dataset.active = "true"
            // if(document.querySelector('.aundo-accordion[data-active="true"]')) {
            //     document.querySelector('.aundo-accordion[data-active="true"]').dataset.active = 'false'
            //     setTimeout(() => {
            //         y = accordionContainer.getBoundingClientRect().top + window.pageYOffset;
            //         window.scrollTo({top: y})
            //         accordionContainer.dataset.active = "true"
            //     }, 500)
                
            // } else {
            //     accordionContainer.dataset.active = "true"
            // }
            // accordionContainer.dataset.active = "true"
        }
    }
    const onClickOutside = (target) => {
        if (
            !target.closest('.aundo-accordion')    
        ) {
            setTimeout(() => {
                accordionContainer.dataset.active = "false"
            }, 10)
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

    if (acc.closest(".wp-block-columns")) {
        acc.closest(".wp-block-columns").classList.add("accColumns")
    }
}