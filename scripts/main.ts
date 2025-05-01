function deleteTask(columnName: string, taskName) {
    fetch(`tasks/${columnName}/${taskName}`, { method: 'DELETE' }).then(
         () => window.location.reload()
    )
}

function getData(event) {
    return {
         columnName: event.currentTarget
              .closest('.task')
              .querySelector('h1').innerText,
         taskName: event.currentTarget
              .closest('.column')
              .querySelector('h1').innerText,
    }
}

function dragStartHandler(event) {
    // Get the HTML content of the target element
    const targetHTML = event.currentTarget.outerHTML

    // Set the HTML content in the dataTransfer object
    event.dataTransfer.setData('text/html', targetHTML)

    console.log('Drag START', event.currentTarget.className)

    event.currentTarget = document.querySelector('.task-slot')
}

function dragLeaveHandler(event) {
    event.currentTarget.style.background = 'white'
    console.log('Drag LEAVE')
}

function dragEnterHandler(event) {
    event.currentTarget.innerHTML =
         event.dataTransfer.getData('text/html')
    console.log('Drag ENTER', dataTransfer)
}