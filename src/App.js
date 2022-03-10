import React, { useState, useEffect, useMemo, Component } from 'react'
import './App.css'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

import Amplify, { Storage } from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend /* MdList */ } from 'react-icons/md'
import axios from 'axios' 
import awsConfig from './aws-exports'
Amplify.configure(awsConfig)




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
const useFetchData = (url) => {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });
  useEffect(() => {
    //let isMounted = true;  
    axios.get(url)
      .then((res) => {
        console.log(res.data.Items.length)
         setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: "https://d45d6eflg0xcw.cloudfront.net/out/v1/b65def8a01a94e339c0098b15cb45690/01dad64582044b28a86e1bb458dcdd32/8a79691014a04ac09f8200b305a6c598/index.m3u8"}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[3].filepath.S}]}], 
            error: null });
        
      })
      .catch((error) => {
        setState({ isLoading: false, data: null, error });
      });
  }, [url]);
  return state;
};



const fetchURLData = (url) => {
  const [state, setState] = useState({ isLoadingURL: true, errorURL: null, cmafURL: null, hlsURL: null, dashURL: null, mssURL:null });
  useEffect(() => {
    //let isMounted = true;  
    axios.get(url)
      .then((res) => {
        console.log(res.data.Items.length)
         setState(
          { isLoadingURL: false, 
            cmafURL:res.data.Items[0],
            hlsURL:res.data.Items[1],
            dashURL:res.data.Items[2],
            mssURL:res.data.Items[3],
            error: null });
        
      })
      .catch((error) => {
        setState({ isLoading: false, data: null, error });
      });
  }, [url]);
  return state;
};




const App = () => {
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [response, setResponse] = useState('')
  const [mediaURL,setURL] = useState('')
  
  
  const onChange = (e) => {
    e.preventDefault()
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0])
      setName(e.target.files[0].name)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (file) {
      Storage.put(name, file, {
        /* level: 'protected', */
        contentType: file.type,
      })
        .then((result) => {
          console.log(result)
          
          setURL("https://9ticl01lyi.execute-api.us-west-2.amazonaws.com/test/mediaurls" + "?" + "fileName=\public\" + {name});
          console.log(mediaURL)
          setResponse(`Success uploading file: ${name}!`)
        })
        .then(() => {
          document.getElementById('file-input').value = null
          setFile(null)
        })
        .catch((err) => {
          console.log(err)
          setResponse(`Can't upload file: ${err}`)
        })
    } else {
      setResponse(`Files needed!`)
    }
  }
  
  
  
 const { isLoading, data, error } = useFetchData("https://56lor2kfz8.execute-api.us-east-1.amazonaws.com/test/videos");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error: {error}</div>;

  
  

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='AnyCompany video team, Sign-In with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='AnyCompany video team, Sign-In with Your E-Mail Address'
        slot='sign-up'
      />
      <div className='header'>
        <h2>
          <a href='/'>AnyCompany Video Admin Panel</a>
        </h2>
      </div>
      <div className='video-uploader'>
        <form onSubmit={(e) => onSubmit(e)}>
          <p>
            <label className='select-label'>Select video: </label>
          </p>
          <p>
            <input
              className='video-input'
              type='file'
              id='file-input'
              accept='video/*'
              onChange={(e) => onChange(e)}
            />
          </p>
          <button type='submit' className='btn'>
            Submit <MdSend className='btn-icon' />
          </button>
        </form>
      </div>

      {response && (
        <div id='upload-status' className='upload-status'>
          {response}
        </div>
      )}
      
      
      {response && (
       <div>
        <div>
          "Recently Uploaded Video"
        </div>
        <div>       
        <table>
          <tbody>
            
             <tr>
            {data.map(function(object, i){
              //console.log(object);
              return<td><VideoPlayer { ...object  }/></td>
            })}
            </tr>
          </tbody>
        </table>
      </div>
       </div>
      )}


      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  )
}
  
export default App
