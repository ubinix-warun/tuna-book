import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
// import Form from './components/Form';
import Form2 from './components/Form2';
import SignIn from './components/SignIn';
// import Messages from './components/Messages';
import Tunas from './components/Tunas';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  // const [messages, setMessages] = useState([]);
  const [ledger, setTunas] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    // contract.getMessages().then(setMessages);
    contract.getTunas().then(setTunas);
  }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   const { fieldset, message, donation } = e.target.elements;

  //   fieldset.disabled = true;

  //   // TODO: optimistically update page with new message,
  //   // update blockchain data in background
  //   // add uuid to each message, so we know which one is already known
  //   contract.addMessage(
  //     { text: message.value },
  //     BOATLOAD_OF_GAS,
  //     Big(donation.value || '0').times(10 ** 24).toFixed()
  //   ).then(() => {
  //     contract.getMessages().then(messages => {
  //       setMessages(messages);
  //       message.value = '';
  //       donation.value = SUGGESTED_DONATION;
  //       fieldset.disabled = false;
  //       message.focus();
  //     });
  //   });
  // };

  const onSubmit2 = (e) => {
    e.preventDefault();

    const { fieldset, vessel, location, holder, donation } = e.target.elements;

    fieldset.disabled = true;
    
    contract.addTuna(
      { 
        vessel: vessel.value,
        location: location.value,
        holder: holder.value
      },
      BOATLOAD_OF_GAS,
      Big(donation.value || '0').times(10 ** 24).toFixed()
    ).then(() => {
      contract.getTunas().then(ledger => {
        setTunas(ledger);
        vessel.value = '';
        location.value = '';
        holder.value = '';
        donation.value = SUGGESTED_DONATION;
        fieldset.disabled = false;
      });
    });

  };

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR Tuna Book'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <Container>
      <Jumbotron>
        {/* <Row>
          <header>
            <h1>NEAR Tuna Book</h1>
            { currentUser
              ? <Button onClick={signOut}>Log out</Button>
              : <Button onClick={signIn}>Log in</Button>
            }
          </header>
        </Row><br/> */}
        <Row>
      { currentUser
        ? <Col><header>
        <h1>NEAR Tuna Book</h1>
        <Button onClick={signOut}>Log out</Button>
      </header><br/><Form2 onSubmit2={onSubmit2} currentUser={currentUser} /></Col>
        : <Col><header>
        <h1>NEAR Tuna Book</h1><Button onClick={signIn}>Log in</Button>
        </header><br/><SignIn/></Col>
      }
      { !!currentUser && !!ledger.length && <Col><Tunas ledger={ledger}/></Col> }
        </Row>
      </Jumbotron>
    </Container>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addTuna: PropTypes.func.isRequired,
    getTunas: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
