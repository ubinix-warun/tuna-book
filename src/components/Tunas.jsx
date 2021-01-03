import React from 'react';
import PropTypes from 'prop-types';

export default function Tunas({ ledger }) {
  return (
    <>
      <h2>Tuna List</h2>
      {ledger.map((tunarecord, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} >
          <strong>{tunarecord.holder}</strong>:<br/>
          {tunarecord.vessel}
        </p>
      )}
    </>
  );
}

Tunas.propTypes = {
  ledger: PropTypes.array
};
