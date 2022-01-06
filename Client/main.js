const snacksContainer = document.querySelector('#snacks-container')//targets container
const form = document.querySelector('form')//targets form
const baseURL = `http://localhost:4000/api/snacks`
//^^ saves these variables for use within the entire file

const snacksCallback = ({ data: snacks }) => displaySnacks(snacks)
const errCallback = err => console.log(err)//will console log errors
//////

const createSnack = body => axios.post(baseURL, body).then(snacksCallback).catch(errCallback)
const getAllSnacks = () => axios.get(baseURL).then(snacksCallback).catch(errCallback)//READ
const updateSnack = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(snacksCallback).catch(errCallback)
const deleteSnack = id => axios.delete(`${baseURL}/${id}`).then(snacksCallback).catch(errCallback)
//^^ CRUD actions 

function submitHandler(e) {
    e.preventDefault()
    //^^callback function for event listener 

    let snackName = document.querySelector('#snackName')
    let quantity = document.querySelector('#quantity')
    let bodyObj = {
        snackName: snackName.value,
        quantity: quantity.value, 
        }
    //^^targets inputs - pulls their values - constructs objects with keys that point to values
    
    createSnack(bodyObj)

    snackName.value = ''
    quantity.value = ''
    //clears form once submitted
}

function createSnackCard(snack) {
    const snackCard = document.createElement('div')
    snackCard.classList.add('snack-card')//add class to snack card DIV

    snackCard.innerHTML = `
    <p class="snackName">${snack.snackName}</p>
    <div class="btns-container">
        <button onclick="updateSnack(${snack.id}, 'minus')">less</button>
        <p class="snack-quantity">${snack.quantity}</p>
        <button onclick="updateSnack(${snack.id}, 'plus')">more</button>
    </div>
    <button onclick="deleteSnack(${snack.id})">Delete</button>`
    //^^ tells controller to add or subtract quantity using buttons

    snacksContainer.appendChild(snackCard)//renders card to the page
}

function displaySnacks(arr) {
    snacksContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createSnackCard(arr[i])
    }
}
//reads all snacks and creates cards

form.addEventListener('submit', submitHandler)//listens for submit button - bound to form

getAllSnacks()//entire process - fetches snack data from server, creates and puts cards on the page