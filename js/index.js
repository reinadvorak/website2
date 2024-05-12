open = document.getElementById('open')
container = document.getElementById('container')
btn = document.getElementById('btn')
close = document.getElementById('close')

close.addEventListener('click', () => {
    btn.classList.add('show-btn')
    container.classList.add('show-container')
})

open.addEventListener('click', () => {
    container.classList.remove('show-container')
    btn.classList.remove('show-btn')
})
