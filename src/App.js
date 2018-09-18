import React, { Component } from 'react';
import logo from './logo.svg';
import FileUpload from './FileUpload';
import './App.css';
import firebase from 'firebase';

class App extends Component {
  //Manejar estados
  constructor (){
    super();
    this.state={
      //objeto
      user: null,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
    //this.renderLoginButton = this.renderLoginButton.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  //Ciclo de vida
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user
      });
    });
    //listener para base de datos
    firebase.database().ref('user').on('child_added', snapshot => {
      this.setState({
        picture: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  //Metodo para autenticar
  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  //Metodo para desloguear
  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  //Metodo para obtener la imagen
  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/Photos/${file.name}`);
    const task = storageRef.put(file);
    //cambiar el estado de la barra
    task.on('state_changed',snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        this.setState({
            uploadValue: percentage
        })
    }, error => {
        console.log(error.message)
    }, () => {
        const record = {
          photoURL: this.state.user.photoURL,
          name: this.state.user.displayName,
          image: task.snapshot.downloadURL
        };
        //almacenar en base de datos
        const dbRef = firebase.database.ref('user');
        const newPicture = dbRef.push();
        newPicture.set(record);
    });
}

  //Listener
  renderLoginButton(){
    //Si esta logueado
    if (this.state.user){
      return (
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Salir</button>
          <FileUpload onUpload={this.handleUpload}/>
          {
            this.state.pictures.map(picture => (
              <div>
                <img src={picture.imgage}/>
                <br/>
                <img src={picture.photoURL} alt={picture.displayName}/>
                <br/>
                <span>{picture.displayName}</span>
              </div>
            ))
          }
        </div>
      );
    }else{
      return(
        <button onClick={this.handleAuth}>Login con Google!</button>
      );
    }
  }
  
  //Formulario
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Petinder</h1>
        </header>
        <p className="App-intro">
        {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;
