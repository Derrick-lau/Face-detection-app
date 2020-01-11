import React, {Component} from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import Logo from './components/Logo/Logo';
import{ImageLinkInput} from './components/ImageLinkInput/ImageLinkInput';
import FaceDetectionimg from './components/FaceDetection/FaceDetection';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import Particles from 'react-particles-js';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';

const ptops = {
  particles: {
    number: {
      value:100,
      density:{
        enable:true,
        value_area:300   
      }
    }
  }
};
      
const initialState = {
  inputurl:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isProfileOpen: false,
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: '',
        age: 0,
        pet: ''
      } 
}       
class mainApp extends Component {
  constructor() {
    super();
    this.state = initialState;
    }

  updateUser =(data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.updateUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
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
      this.setState({isSignedIn: true})
    }else if (route === 'signin') {
      this.setState(initialState)
    }
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.faceLocation(response))
      })
      .catch(err => console.log(err));
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }
  render () {
    return (
      <>
          <Particles className='particles' params={ptops}/>
          <TopBar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
          {
            this.state.isProfileOpen &&
            <Modal>
              <Profile isProfileOpen={this.state.isProfileOpen} toggleModal={this.toggleModal} user={this.state.user} loadUser={this.updateUser} />
            </Modal>
          }
          { this.state.route ==='home'? 
              <div>
                  <Logo/>
                  <Rank 
                    name={this.state.user.name} 
                    entries={this.state.user.entries}/>
                  <ImageLinkInput 
                    onInputChange = {this.onInputChange} 
                    onSubmit = {this.onSubmit} />
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
      </>
    );
  }
}

export default mainApp;

