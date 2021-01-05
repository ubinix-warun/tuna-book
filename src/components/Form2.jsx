import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Form2({ onSubmit2, currentUser }) {
  return (
    <Form onSubmit={onSubmit2}>
      <fieldset id="fieldset">
        <p>Record the tuna book, { currentUser.accountId }!</p>

        <Form.Group >
          {/* <Form.Label>Vessel:</Form.Label> */}
          <Form.Control type="text" placeholder="Vessel" 
            id="vessel"
            required  />
        </Form.Group>
  
        <Form.Group >
          {/* <Form.Label>Location:</Form.Label> */}
          <Form.Control type="text" placeholder="Location" 
            id="location"
            required  />
        </Form.Group>

        <Form.Group >
          {/* <Form.Label>Holder:</Form.Label> */}
          <Form.Control type="text" placeholder="Holder" 
            id="holder"
            required  />
        </Form.Group>

        <Form.Group >
          <Form.Label>Donation (optional):</Form.Label>
          <Form.Control type="text" autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"/>
            {/* <span title="NEAR Tokens">Ⓝ</span> */}
        </Form.Group>

        <Button type="submit">
          Record
        </Button>
      </fieldset>
    </Form>
  );
}

Form2.propTypes = {
  onSubmit2: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
