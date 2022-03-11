import React from 'react';
import axios from 'axios';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './Components.css'
 





class VideoPlayer extends React.Component {

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      
      <div data-vjs-player style={{
          width: 270, height: 160
        }}>
        <video  ref={(node) => { this.videoNode = node; }} className="video-js" />
      </div>
      

    );
  }
}


export default class VideoPlayerList extends React.Component {
  
  constructor(props){
  super(props)
  this.state = {
    data: [],
    isLoading:true,
    error:false,
    cmafURL:"",
    hlsURL:"",
    dashURL:"",
    mssURL:"",
    urlList:[],
   funcURL:"",
    name: this.props.name   
    }
  } 
  
  componentDidMount() {
   this.state.urlList=null; 
   
 
   const inpFileName = "public/" + this.props.name
   console.log(inpFileName)
 
   console.log("url")
   console.log(this.state.funcURL)
   
  
   axios.get('https://9ticl01lyi.execute-api.us-west-2.amazonaws.com/test/mediaurls',{
        params: {
             fileName: inpFileName
        }
     })
      .then(res => {
        console.log('res.data')
        console.log(res.data)
        this.state.urlList =res.data 
        this.state.cmafURL=this.state.urlList[0]
        this.state.hlsURL=this.state.urlList[1]
        this.state.mssURL=this.state.urlList[2]
        this.state.dashURL=this.state.urlList[3]
    
        console.log("printing URLs")
        
        console.log(this.state.cmafURL)
        console.log(this.state.hlsURL)
        console.log(this.state.dashURL)
        console.log(this.state.mssURL)
    
        
        if(this.state.urlList){
          this.setState({isLoading:false, error:false});
          console.log("inside mount after setstate")
          console.log(this.state.urlList);
          
         this.setState(
              { isLoading: false, data: [
                {autoplay: false, controls: true,sources: [{src: this.state.urlList[0]}]},
                {autoplay: false, controls: true,sources: [{src: this.state.urlList[1]}]},
                {autoplay: false, controls: true,sources: [{src: this.state.urlList[2]}]},
                {autoplay: false, controls: true,sources: [{src: this.state.urlList[3]}]}], 
                error: null 
              });


          console.log("inside mount after list")
        }
     
     
     
      })
     .catch((error) => {
        this.setState({isLoading:false, error:true });
      });
  }

  render() {
    console.log('in render: isloading ' + this.state.isLoading)
    console.log('name' )
    console.log( this.props.name)
    
    console.log('in render: error ' + this.state.error)
    if (this.state.isLoading) return <div>Loading...</div>;
    if (this.state.error) return <div>There was an error:{this.state.error}</div>;
    
    console.log("inside render")
  
    return (
     <div>
   


       <div>
        <div className="divheder">
          Recently Uploaded Video
        </div>
        <div>       
        <table>
          <tbody>
            
             <tr>
            {this.state.data.map(function(object, i){
              //console.log(object);
              return<td><VideoPlayer { ...object  }/></td>
            })}
            </tr>
            <tr>
             <td>Videoformat: CMAF</td>
                <td>Videoformat: HLS</td>
                <td>Videoformat: MSS</td>
                <td>Videoformat: DASH</td>
             </tr>
          </tbody>
        </table>
      </div>
       </div>
      
    
      </div>
      
    )
  }
}
