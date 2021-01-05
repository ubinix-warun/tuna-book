import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

export default function Tunas({ ledger }) {
  return (
    <>
      <h2>Tuna List</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Vessel</th>
            <th>Location</th>
            <th>Holder</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((tunarecord, i) =>
            // TODO: format as cards, add timestamp
            <tr>
              <td>{i+1}</td>
              <td>{tunarecord.vessel}</td>
              <td>{tunarecord.location}</td>
              <td>{tunarecord.holder}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <p>PS: last 7 records</p>
    </>
  );
}

Tunas.propTypes = {
  ledger: PropTypes.array
};
