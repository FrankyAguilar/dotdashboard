import React, { Component } from 'react';
import MyContract from '../DotSticker.json';

import { 
  Button ,
  FormGroup , 
  FormControl ,
  ControlLabel,
  Well
} from 'react-bootstrap';

import Web3 from 'web3';

var style = {
  merginTop: 20
};

var web3 = new Web3('http://localhost:8545');
var something = "JELLO";

class LandingPage extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      isConnected: false,
      defaultAccount: '',
      provider: '',
      contract: null,
    };

    //var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    //MAKE SURE IS CONNECTED
    web3.eth.net.isListening()
      .then(() => {
        this.setState({isConnected:true});
        console.log('is connected')
      })
      .catch(e => {
        this.setState({isConnected:false});
        console.log('Wow. Something went wrong')
        }
      );

    //SET ACCOUNTS
    web3.eth.getAccounts()
      .then((r)=> {
        const defaultAccount = r[0];
        this.setState({defaultAccount: defaultAccount});
      });

    //GET PROVIDER
    web3.eth.net.getNetworkType()
      .then((r) => {
        this.setState({provider: r});
      });

  }

  async componentDidMount () {

    const myContract = new web3.eth.Contract(MyContract, '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4', {
      from: this.state.defaultAccount, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    }); 

    this.setState({contract: myContract})

  }

  listMintedTokens = () => {

    this.state.contract.methods.totalSupply().call()
      .then(function(result){
        alert(`${result} Total Stickers in Contract`);
      });
  }

  handleSubmit (event) {
    
    this.state.contract.methods.allstickers(0).call()
      .then(function(result){
        console.log(result);
      });

      event.preventDefault();
      
  }
  

  render() {



    return (
      <div className="container" style={style}>
      <Well>
        <p> 
          Connected: {this.state.provider} 
          <br /> 
          Address: {this.state.defaultAccount} 
        </p>
      </Well>

      <Button onClick={this.listMintedTokens}>List Total Supply</Button>

      <form onSubmit={this.handleSubmit}>
            <h2>Get Collectible from ID</h2>
            <FormGroup controlId="formControlName">
              <ControlLabel>ID:</ControlLabel>
              <FormControl
                type="text"
                name="name"
                // value={this.state.value}
                placeholder="Enter text"
                // onChange={this.handleChange}
              />
            </FormGroup>

            <Button type="submit">{something}</Button>
            
        </form>

      </div>
    );
  }
}
  
export default LandingPage;