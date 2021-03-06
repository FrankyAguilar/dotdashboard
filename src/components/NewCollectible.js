import React, { Component } from 'react';
import { 
    Panel,
    Button ,
    FormGroup , 
    Label , 
    FormControl ,
    Well ,
    ControlLabel , 
    HelpBlock } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageUploader from 'react-images-upload';
import  firebaseConf from '../firebase/firebase';

var style = {
    merginTop: 20
  };

class NewCollectible extends React.Component {

    constructor(props) {

        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {

            name: '',
            description:'',
            type: '',
            attributes: {
              tags: []
            },
            image: '',
            background_color: 'FFFFFF',
            external_url: 'https://mydotwallet.com'

          };

    }

    handleChange(event) {
      if (event.target.name == "attributes") {
        this.setState({
          attributes : 
          { 
            tags : event.target.value.split(', ') 
          }

        });
        console.log(this.state)

        return;
      }
      
      //Other Fields
      this.setState({
          [event.target.name] : event.target.value
      });
    }


    handleSubmit(event){


      // var db = firebaseConf.firestore();
      // db.settings({
      //   timestampsInSnapshots: true
      // });

      // db.collection("Collectibles").add(this.state)
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      // })
      // .catch(function(error) {
      //     console.error("Error adding document: ", error);
      // });

      // return;

      firebaseConf.database().ref('collectibles/items').push(this.state).then((result) => {
        alert(result);
        console.log(result);
      }).catch((error) => {
        alert(error);
      });

      event.preventDefault();

    }

    handleImage(pictureFiles, pictureDataURLs) {
      

      if (pictureFiles.length == 0){
        return;
      }
      var date = Date.now();
      var imageType = pictureFiles[0].type;
      var imagesRef = `dwc-${date}-${pictureFiles[0].name}`;
      var storageRef = firebaseConf.storage().ref().child(imagesRef);
      var uploadTask = storageRef.put(pictureFiles[0]);
      uploadTask.on('state_changed', function(snapshot){
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, error => {
        alert(error);
      }, success => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          var name = 'https://storage.googleapis.com/dotwallet.appspot.com/' + imagesRef;
          

          this.setState({
              image: name,
              type: imageType.replace("image/", ""),
              creation_timestamp: Date(date)
          });

          console.log('File available at', name);
          console.log(this.state)
        });
      });
    }

    
  render() {
      
    function FieldGroup({ id, label, help, ...props }) {
        return (
          <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
          </FormGroup>
        );
      }

    return (
        <div className="container" style={style}>

        <Panel>
        <Panel.Body>
        <form onSubmit={this.handleSubmit}>
            <h2>New Collectible</h2>
            <p>Please provide all required fields to Mint a DotWallet Collectible Item.</p>

            <FormGroup controlId="formControlName">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup controlId="formControlDescription" >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                componentClass="textarea" 
                value={this.state.value}
                placeholder="Enter text"
                name="description"
                onChange={this.handleChange}
            />
            </FormGroup>

            <FormGroup controlId="formControlsAttributes">
                <ControlLabel>Additional Data: <Label>JSON PROPERTY FORMAT</Label></ControlLabel>
                <FormControl 
                componentClass="textarea" 
                value={this.state.value}
                placeholder="" 
                name="attributes"
                onChange={this.handleChange}
                help="Must conform to JSON protocol."/>
            </FormGroup>

            
            <Well>
            <ImageUploader
            withPreview = {true}
                  withIcon={true}
                  buttonText='Choose image'
                  onChange={this.handleImage}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={ 5242880 }
            />
            </Well>

            <hr />
            <FormGroup>
                <ControlLabel id="mintingAddress">Minting Address</ControlLabel>
                <FieldGroup
                id="mintingAddress"
                type="text"
                label="Name"
                value={this.state.creator}
                placeholder="Enter text"
            />
            </FormGroup>
        
            <Button type="submit" >Mint</Button>
            
        </form>
        </Panel.Body>
        </Panel>
        </div>
        );
    }
}

export default NewCollectible;

