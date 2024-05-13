const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', 'programming', 'interface', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []

//Show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `).join('')
    }
    `
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex'
        disableGame()
    }
}

//Update the wrong letters
function updateWrongLettersEl() {
    //Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if(index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    //Check if lost
    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost!'
        popup.style.display = 'flex'
        disableGame()
    }
}

// Show Notification
function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

function disableGame() {
    window.removeEventListener('keydown', handleKeydown)
}

//Keydown letter press
function handleKeydown(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key

        if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
            showNotification()
            return
        }

        if(selectedWord.includes(letter)) {
            correctLetters.push(letter)
            displayWord()
        } else {
            wrongLetters.push(letter)
            updateWrongLettersEl()
        }
        // if(selectedWord.includes(letter)) {
        //     if(!correctLetters.includes(letter)) {
        //         correctLetters.push(letter)

        //         displayWord()
        //     } else {
        //         showNotification()
        //     }
        // } else {
        //     if (!wrongLetters.includes(letter)) {
        //         wrongLetters.push(letter)

        //         updateWrongLettersEl()
        //     } else {
        //         showNotification()
        //     }
        // }
    }
}

window.addEventListener('keydown', handleKeydown)

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    correctLetters.length = 0
    wrongLetters.length = 0

    selectedIndex = Math.floor(word.length * Math.random())
    selectedWord = word[selectedIndex]

    displayWord()

    updateWrongLettersEl()

    popup.style.display = 'none'
    enableGame()
})

function enableGame() {
    window.addEventListener('keydown', handleKeydown)
}

displayWord()
