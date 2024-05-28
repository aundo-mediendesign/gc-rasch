export function generateEditWindow(blockRef, contentRef, setEditorActive) {
    let editId = blockRef.parentNode.id + blockRef.dataset.name 

    if (setEditorActive) {
        setEditorActive(true)
    }
    function CloseButton() {
        function closeWindow() {
            document.querySelector('[data-id="' + editId + '"]').style.display = "none"
        }
        return (
            <div>
                <button onClick={closeWindow} class="save">Fertig</button>
            </div>
        )
    }
    if (!document.querySelector('[data-id="' + editId + '"]')) {
        let container = document.createElement('div')
        container.classList.add('window')
        container.dataset.id = editId
        document.querySelector('.is-root-container').prepend(container)
        wp.element.render(
            wp.element.createElement( CloseButton ),
            container
        )
        let blockRefName = blockRef.dataset.name
        container.querySelector('div').prepend(contentRef)
        container.querySelector('.windowContent').style.display = 'block'
    }
    else {
        document.querySelector('[data-id="' + editId + '"]').style.display = "flex"
    }
}
