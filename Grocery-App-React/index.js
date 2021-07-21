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
                price:''
            
        }

        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.updateItemName = this.updateItemName.bind(this)
        this.updateItemPrice = this.updateItemPrice.bind(this)
        this.updateItemUnits = this.updateItemUnits.bind(this)
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
            />
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
        <td key="button"><button  type="button"  className="edit">Edit</button></td>
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