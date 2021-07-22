class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
             grocery : [
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
            ],
            
                itemName : "",
                units:'',
                price:'',
                canSave:false
            
        }

        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.updateItemName = this.updateItemName.bind(this)
        this.updateItemPrice = this.updateItemPrice.bind(this)
        this.updateItemUnits = this.updateItemUnits.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.updateEditItem = this.updateEditItem.bind(this)
        this.handleClearAll = this.handleClearAll.bind(this)
    }
    handleClearAll(){
        this.setState({
            grocery:[]
        })
    }
    handleDeleteItem (i){
        console.log("ok")
        this.setState((currentState)=>{
            console.log(currentState.grocery.filter((item,index)=> index!==i))
            return {
                grocery : currentState.grocery.filter((item,index)=> index!==i)
                
            }
        })
    }
     handleEditItem(e,i){

        if(this.state.canSave) { 
            const itemName = e.target.parentNode.parentNode.children[2].innerText
            const itemqty = +e.target.parentNode.parentNode.children[3].innerText
            const itemPrice = +e.target.parentNode.parentNode.children[4].innerText
            console.log(itemName,itemqty,itemPrice,"updates")
             this.updateEditItem(i,itemName,itemPrice,itemqty)
            e.target.parentNode.parentNode.contentEditable = false
            e.target.innerText = 'Edit'
            this.setState({
                    canSave : false
            })

        } 
        else {
            e.target.parentNode.parentNode.children[2].contentEditable = true
            e.target.parentNode.parentNode.children[3].contentEditable = true
            e.target.parentNode.parentNode.children[4].contentEditable = true
            e.target.innerText = 'Save'
            this.setState({
                canSave : true
        })
        }
    }
     updateEditItem(i,name,price,qty){
        this.setState((currentState)=>{
            return{
                grocery : currentState.grocery.map((listItem,index)=>{
                    console.log(listItem)
                    if(i==index){
                        listItem.item = name
                        listItem.price = price
                        listItem.units = qty
                    }
                    return listItem
                }),
                canSave :false
            }
        })
    }
    updateItemName(e){
        let value = e.target.value
        this.setState({
            itemName :value
        })
    }
    updateItemPrice(e){
        let value = e.target.value
        this.setState({
            price :+value
        })
    }
    updateItemUnits(e){
        let value = e.target.value
        this.setState({
            units :+value
        })
    }
    handleAddItem(e){
        e.preventDefault()
        this.setState((currentState)=>{
            return {
            grocery:currentState.grocery.concat([{
                item:this.state.itemName,
                units:this.state.units,
                price:this.state.price
            }]),
            itemName :'',
            units:'',
            price:''
            }
        })
    }
    render(){
        return (<div>
            <h1>Grocery List App</h1>
            <form>
                <input type="text" name="itemName" placeholder ="Item name" value = {this.state.itemName} onChange={this.updateItemName}/>
                <input type="number" name="units" placeholder= "Units" value = {this.state.units}onChange={this.updateItemUnits}/>
                <input type="number" name="price" placeholder ="Price" value = {this.state.price} onChange={this.updateItemPrice}/>
                <button  id= "submit" onClick={this.handleAddItem} type="submit">Add Item</button>
            </form>
            
            <DisplayItems 
            grocery={this.state.grocery}
            onRemoveItem ={this.handleDeleteItem}
            onEditItem = {this.handleEditItem}
            />
            <button onClick={this.handleClearAll}>Clear All</button>
            </div>
            
        )
    }
}

function DisplayItems(props){
    return (
    <table>
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
    <tbody>
    
    {props.grocery.map((item,index)=>(
        <tr key="tablerow">
        <td key="buton"><button type="button" onClick={()=> props.onRemoveItem(index)} className="delete">X</button></td>
        <td key ="serialnum">{index+1}</td>
        <td key="name">{item.item}</td>
        <td key="price">{item.price}</td>
        <td key="quantity">{item.units}</td>
        <td>{item.units * item.price}</td>
        <td key="button"><button  type="button" onClick={(e)=> props.onEditItem(e,index)} className="edit">Edit</button></td>
        </tr>
    ))}
    
    
        

    </tbody>
    </table>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('container')
)