export function AccordionJs({acc}) {
    const accordionContainer = acc.querySelector('.accordionContainer')
    const showHideContent = (e) => {
        if (accordionContainer.dataset.active == "true") {
            accordionContainer.dataset.active = "false"
        }
        else {
            accordionContainer.dataset.active = "true"
        }
    }
    const onClickOutside = () => {
        accordionContainer.dataset.active = "false"
        document.removeEventListener("click", onClickOutside)
    }

    acc.querySelector('.accHead').addEventListener('click', showHideContent)
    
    acc.addEventListener('mouseenter', () => {
        document.removeEventListener("click", onClickOutside)
    })
    acc.addEventListener('mouseleave', () => {
        document.addEventListener("click", onClickOutside)
    })

    if (acc.closest(".wp-block-columns")) {
        acc.closest(".wp-block-columns").classList.add("accColumns")
    }
}