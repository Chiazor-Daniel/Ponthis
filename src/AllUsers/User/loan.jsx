import React from 'react'
import LoanApplicationStepper from './loanstepper'

const Loan = ({ handleLoan, userToken }) => {
  return (
    <div style={{ height: '100vh', width: '100%', background: '#212529', position: 'fixed', zIndex: 9999 }}>
      <button onClick={() => handleLoan()} className='' style={{ background: 'transparent', padding: '20px', border: 'none', position: 'absolute', top: 0, right: 0 }}>
        <img src="log-out.png" style={{ width: '50px' }} />
        {/* <span>Exit Loan</span> */}
      </button>
      {/* <div style={{ background: 'transparent', padding: '20px', border: 'none', position: 'absolute', top: 0, left: '35%', color: 'white', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <img src="logo2.png" style={{ width: '100px' }} />
        <h1 style={{ color: 'white' }}>LedgerSafe Loan Services</h1>
      </div> */}

      <LoanApplicationStepper userToken={userToken} handleLoan={handleLoan}/>
    </div>
  )
}

export default Loan