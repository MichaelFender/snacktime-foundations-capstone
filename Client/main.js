const snacksContainer = document.querySelector('#snacks-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/snacks`

const snacksCallback = ({ data: snacks }) => displaySnacks(snacks)
const errCallback = err => console.log(err)

const getAllSnacks = () => axios.get(baseURL).then(snacksCallback).catch(errCallback)
const createSnack = body => axios.post(baseURL, body).then(snacksCallback).catch(errCallback)
const deleteSnack = id => axios.delete(`${baseURL}/${id}`).then(snacksCallback).catch(errCallback)
const updateSnack = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(snacksCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let snackName = document.querySelector('#snackName')
    let quantity = document.querySelector('#quantity')
    

    let bodyObj = {
        snackName: snackName.value,
        quantity: quantity.value, 
        }

    createSnack(bodyObj)

    snackName.value = ''
    quantity.value = ''
}

function createSnackCard(snack) {
    const snackCard = document.createElement('div')
    snackCard.classList.add('snack-card')

    snackCard.innerHTML = `
    <p class="snackName">${snack.snackName}</p>
    <div class="btns-container">
        <button onclick="updateSnack(${snack.id}, 'minus')">less</button>
        <p class="snack-quantity">${snack.quantity}</p>
        <button onclick="updateSnack(${snack.id}, 'plus')">more</button>
    </div>
    <button onclick="deleteSnack(${snack.id})">Delete</button>
    `


    snacksContainer.appendChild(snackCard)
}

function displaySnacks(arr) {
    snacksContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createSnackCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllSnacks()