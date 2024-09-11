import React from 'react'
import LoanApplicationStepper from './loanstepper'

const Loan = ({handleLoan}) => {
  return (
    <div style={{height: '100vh', width: '100%', background:'#C96868', position: 'fixed', zIndex: 9999}}>
        <button onClick={()=>handleLoan()} className='' style={{background: 'transparent',padding: '20px', border: 'none', position: 'absolute', top: 0, right: 0}}>
            <img src="log-out.png" style={{width: '50px'}}/>
            {/* <span>Exit Loan</span> */}
        </button>


        <LoanApplicationStepper />
    </div>
  )
}

export default Loan