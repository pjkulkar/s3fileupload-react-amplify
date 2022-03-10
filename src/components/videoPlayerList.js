import React from 'react';
import axios from 'axios';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
 





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
  
  constructor(){
  super()
  this.state = {
    data: [],
    isLoading:true,
    error:false,
    cmafURL:"",
    hlsURL:"",
    dashURL:"",
    mssURL:"",
    urlList:[],
   
    name: this.props.name    
    }
  } 
  
  componentDidMount() {
   this.state.urlList=null; 
   axios.get('https://9ticl01lyi.execute-api.us-west-2.amazonaws.com/test/mediaurls?fileName=\public\${name}')
      .then(res => {
        console.log('res.data')
        console.log(res.data)
        this.state.urlList =res.data 
        this.state.cmafURL=urlList[0]
        this.state.hlsURL=urlList[1]
        this.state.dashURL=urlList[2]
        this.state.mssURL=urlList[3]
    
        console.log("printing URLs")
        
        console.log(this.state.cmafURL)
        console.log(this.state.hlsURL)
        console.log(this.state.dashURL)
        console.log(this.state.mssURL)
    
        
        if(this.state.urlList){
          this.setState({isLoading:false, error:false});
          console.log("inside mount after setstate")
          console.log(this.state.urlList);
          
         setState(
              { isLoading: false, data: [
                {autoplay: false, controls: true,sources: [{src: "https://d45d6eflg0xcw.cloudfront.net/out/v1/b65def8a01a94e339c0098b15cb45690/01dad64582044b28a86e1bb458dcdd32/8a79691014a04ac09f8200b305a6c598/index.m3u8"}]},
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
          <table>
            <thead>
              <tr>
                <th>Movies Like X</th>
               </tr>
            </thead>
          </table>
        
      </div>


       <div>
        <div>
          "Recently Uploaded Video"
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
          </tbody>
        </table>
      </div>
       </div>
      
    
      </div>
      
    )
  }
}
