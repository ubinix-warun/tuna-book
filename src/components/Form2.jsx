import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Form2({ onSubmit2, currentUser }) {
  return (
    <form onSubmit={onSubmit2}>
      <fieldset id="fieldset">
        <p>Record the tuna book, { currentUser.accountId }!</p>
        <p className="highlight">
          <label htmlFor="vessel">Vessel:</label>
          <input
            autoComplete="off"
            autoFocus
            id="vessel"
            required
          />
        </p>
        <p className="highlight">
          <label htmlFor="location">Location:</label>
          <input
            autoComplete="off"
            autoFocus
            id="location"
            required
          />
        </p>
        <p className="highlight">
          <label htmlFor="holder">Holder:</label>
          <input
            autoComplete="off"
            autoFocus
            id="holder"
            required
          />
        </p>
        <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button type="submit">
          Record
        </button>
      </fieldset>
    </form>
  );
}

Form2.propTypes = {
  onSubmit2: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
