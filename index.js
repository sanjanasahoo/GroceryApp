const container = document.querySelector('.container')
let canSave = true
const initial = `<h1>Grocery List App</h1>
<form>
<input type="text" name="itemName" placeholder ="Item name">
<input type="number" name="units" placeholder= "Units">
<input type="number" name="price" placeholder ="Price">
<button  id= "submit" type="submit">Add Item</button>
</form>
<table></table>
<span></span>`
container.innerHTML = initial
let grocery = [
    {
        item: "yih",
        units: 1,
        price: 40
    },
    {
        item: "abc",
        units: 3,
        price: 20
    }
]
let grocerylist = JSON.parse(localStorage.getItem("groceryitems"));
if (!grocerylist) {
    localStorage.setItem('groceryitems', JSON.stringify(grocery))
}
function displayItems() {
    const tableHeader = `
    <thead>
    <tr>
        <th>Delete</th>
        <th>Sl no</th>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Edit</th>
    </tr>
    </thead>
    `

    const tableRows = grocerylist.map((item, index) => `
       <tr>
       <td><button type="button"  class="delete">X</button></td>
            <td>${index + 1}</td>
            <td>${item.item}</td>
            <td>${item.units}</td>
            <td>${item.price}</td>
            <td>${item.units * item.price}</td>
            <td><button type="button"  class="edit">Edit</button></td>

        </tr>
    `).join('')
    const table = document.querySelector('table')
    table.innerHTML = `${tableHeader}<tbody>${tableRows}</tbody>`
    const grandTotal = grocerylist.reduce((grandTotalAcc,item)=>{
        return grandTotalAcc + (item.price * item.units)
    },0)
    const spanEle = document.querySelector('span')
    spanEle.innerHTML = `Grand Total - ${grandTotal}`
    const deleteButtons = document.querySelectorAll('.delete')
    deleteButtons.forEach(btn => btn.addEventListener('click', deleteRow))
    const editButtons = document.querySelectorAll('.edit')
    editButtons.forEach(btn => btn.addEventListener('click', handleEdit))

}
displayItems()
const form = document.querySelector('form')
form.addEventListener('submit', handleSubmit)



function handleSubmit(event) {
    event.preventDefault()
    const { itemName, units, price } = event.target.elements
    grocerylist.push({
        item: itemName.value,
        units: +units.value,
        price: +price.value
    })
    localStorage.setItem('groceryitems', JSON.stringify(grocerylist))
    displayItems()
}
function deleteRow(e) {
    if (e.target) {
        const index = parseInt(e.target.parentNode.parentNode.children[1].innerText)
        grocerylist.splice(index - 1, 1)
        localStorage.setItem('groceryitems', JSON.stringify(grocerylist))
        displayItems()
    }
}
function handleEdit(e) {
    canSave = !canSave
    if (canSave) save(e)
    else editRow(e)
}
function editRow(e) {
    console.log(e.target.parentNode.parentNode)
    e.target.parentNode.parentNode.contentEditable = true
    e.target.parentNode.parentNode.children[5].contentEditable = false
    e.target.innerText = 'Save'


}
function save(e) {
    const index = parseInt(e.target.parentNode.parentNode.children[1].innerText)
    const itemName = e.target.parentNode.parentNode.children[2].innerText
    const itemqty = +e.target.parentNode.parentNode.children[3].innerText
    const itemPrice = +e.target.parentNode.parentNode.children[4].innerText
    grocerylist[index - 1].item = itemName
    grocerylist[index - 1].units = itemqty
    grocerylist[index - 1].price = itemPrice
    localStorage.setItem('groceryitems', JSON.stringify(grocerylist))
    displayItems()
}