import React, {Component} from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import Logo from './components/Logo/Logo';
import{ ImageLinkInput} from './components/ImageLinkInput/ImageLinkInput';
import FaceDetectionimg from './components/FaceDetection/FaceDetection';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'a3fb29521d3b4970ad5b499285a58934'
  });

const ptops = {
  particles: {
    number: {
      value:300,
      density:{
        enable:true,
        value_area:1000   
      }
    }
  }
};
      
              
class mainApp extends Component {
  constructor() {
    super();
    this.state = {
      inputurl:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: '',
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
    };
  }

  updateUser =(data) => {
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
     }})
  }

  conponentDidMOunt() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => console.log(data))
  }

  faceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcolum: clarifaiFace.left_col* width,
      topRow: clarifaiFace.top_row * height,
      rightcolum: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
      this.setState({inputurl:event.target.value});
  }

  onRouteChange = (route) => {
    this.setState({route:route});

    if (route === 'home') {
      this.setState({isSignedIn:true})
    }else{
      this.setState({isSignedIn:false})
    }
  }

  onSubmit = () => {
    this.setState ({imageUrl:this.state.inputurl})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.inputurl)
      .then(response => {
        fetch('http://localhost:3000/image', {
        method:'put',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
        id: this.state.user.id
      })
    })
        .then(response => response.json())
        .then(data => {
          this.setState(Object.assign(this.state.user, {entries:data}))
        })

        this.displayFaceBox(this.faceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div className="WholeApp">
          <Particles className='particles' params={ptops}/>
          <TopBar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route ==='home'? 
              <div>
                  <Logo/>
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkInput onInputChange = {this.onInputChange} onSubmit = {this.onSubmit} />
                  <FaceDetectionimg box = {this.state.box} imageUrl = {this.state.imageUrl}/>
              </div>
          : 
              (
              this.state.route === 'signin'?
              <Signin updateUser={this.updateUser} onRouteChange={this.onRouteChange}/> 
              :
              <Register updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
              )
          }
      </div>
    );
  }
}

export default mainApp;

