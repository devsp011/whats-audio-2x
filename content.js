const _header_ = '#side header'
const _containerContacts_ = '.-GlrD._2xoTX'
const _attributeSelectContact_ = 'aria-selected'
const _containerMessages_ = '.z_tTQ'

let _speed_ = 2.0
let actived = false


const idInterval = setInterval(() => {

    const header = document.querySelector(_header_)
    if (!header) return

    clearInterval(idInterval)

    const container = document.createElement('div')
    container.classList.add('container')
    container.innerHTML = `
        <button onclick="selectSpeed('btn')" class="btn2x">2.0x</button>
        <ul class="list">
            <li name="1.0">1.0</li>
            <li name="1.5">1.5</li>
            <li name="1.7">1.7</li>
            <li name="2.0">2.0</li>
            <li name="2.3">2.3</li>
            <li name="2.7">2.7</li>
            <li name="3.0">3.0</li>
        </ul>
    `
    container.querySelectorAll('li').forEach(li => li.addEventListener('click', selectSpeed))

    header.appendChild(container)

}, 1000)

function selectSpeed(event) {
    if (!event) return

    const speedString = event.target.innerHTML

    _speed_ = Number(speedString)
    document.querySelector('.btn2x').innerHTML = `${speedString}x`

    console.log(speedString)
}

function audioSpeed(containerMessages) {
    let audios = document.querySelectorAll('audio')

    if (containerMessages) audios = containerMessages.querySelectorAll('audio')

    console.log(audios)
    audios.forEach(audio => audio.playbackRate = 2.0)
}

function observerSelectContact() {
    console.log('click')

    const idInterval = setInterval(() => {
        const containerContacts = document.querySelector(_containerContacts_)

        if (!containerContacts) return

        clearInterval(idInterval)

        observerContainerMessage()

        const observer = new MutationObserver((mutationsList, observer) => {
            observerContainerMessage()
        })

        observer.observe(containerContacts, { attributes: true, attributeFilter: [_attributeSelectContact_], subtree: true })

        // observer.disconnect()
    }, 1000)
}

function observerContainerMessage() {
    const idInterval = setInterval(() => {
        const containerMessages = document.querySelector(_containerMessages_)

        if (!containerMessages) return

        setTimeout(() => audioSpeed(containerMessages), 300)

        clearInterval(idInterval)

        const observer = new MutationObserver((mutationsList, observer) => audioSpeed())

        observer.observe(containerMessages, { childList: true })

        // observer.disconnect()
    }, 1000)
}