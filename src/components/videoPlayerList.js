import React from 'react';
import axios from 'axios';
  
export default class videoPlayerList extends React.Component {
  
  constructor(){
  super()
  this.state = {
    itemsList: [],
    isLoading:true,
    error:false
    }
  } 
  
  componentDidMount() {
   axios.get(`https://bt1m7jsjsj.execute-api.us-west-2.amazonaws.com/test/likex?itemId=24&userId=10`)
      .then(res => {
        console.log('res.data.itemslist')
        console.log(res.data.itemList)
        
        console.log('res.data.item0' + res.data.itemList[0].itemId)
        const itemsList = res.data.itemList
        console.log('movList' + itemsList)
        console.log('movList item 0' + itemsList[0].itemId)
        this.setState({ itemsList})
        console.log('this.state.itemslist' )
        console.log( this.state.itemsList)
        console.log('this.state.itemsList item 0' + this.state.itemsList[0].itemId)
        if(this.state.itemsList){
          this.setState({isLoading:false, error:false});
          console.log("inside mount after setstate")
          console.log(this.state.itemsList);
          console.log("inside mount after list")
        }
      })
     .catch((error) => {
        this.setState({isLoading:false, error:true });
      });
  }

  render() {
    console.log('in render: isloading ' + this.state.isLoading)
    console.log('this.state.itemslist' )
    console.log( this.state.itemsList)
    
    console.log('in render: error ' + this.state.error)
    if (this.state.isLoading) return <div>Loading...</div>;
    if (this.state.error) return <div>There was an error:{this.state.error}</div>;
    
    console.log("inside render")
    console.log('this.state.itemslist' )
    console.log( this.state.itemsList)
    console.log('this.state.itemsList item 0' + this.state.itemsList[0].itemId)
    
    console.log("inside render before return")
    return (
     <div>
     <div>
          <table>
            <thead>
              <tr>
                <th>Movies Like X</th>
               </tr>
            </thead>
            <tbody> 
            {
              this.state.itemsList
              .map(itemList =>
                <tr><td>{itemList[0]}</td>
                </tr>
              )
             }
            </tbody>
          </table>
        
      </div>
      
    
      </div>
      
    )
  }
}
