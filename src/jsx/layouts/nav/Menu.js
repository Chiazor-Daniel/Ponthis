export const MenuList = [
    {
        title: 'Dashboard',	
        classsChange: 'mm-collapse',
        to: "/dashboard",		
        iconStyle: <i className="material-icons">grid_view</i>,
        
    }, 
    {
        title: 'Trading',
        classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">trending_up</i>,
    },
    {
        title: 'Transactions',
        classsChange: 'mm-collapse',
        to: "/transactions", 
        iconStyle: <i className="material-icons">swap_horiz</i>, 
        content: [
            {
                title: 'Make Deposit',
                to: '',
            },
            {
                title: 'Make Withdrawal',
                to: '',
            },
        ]
    }
]
