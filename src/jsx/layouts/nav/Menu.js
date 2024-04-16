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
        to: "/dashboard/trading",
        iconStyle: <i className="material-icons">trending_up</i>,
    },
    {
        title: 'Transactions',
        classsChange: 'mm-collapse',
        to: "", 
        iconStyle: <i className="material-icons">swap_horiz</i>, 
        content: [
            {
                title: 'View transactions',
                to: '/dashboard/view-transactions',
            },
            {
                title: 'Deposit',
                to: '/dashboard/deposit',
            },
            {
                title: 'Withdraw',
                to: '/dashboard/withdraw',
            },
            
        ]
    },
    {
        title: 'Profile',
        classsChange: 'mm-collapse',
        to: "", 
        iconStyle: <i className="material-icons">person</i>, 
        content: [
            {
                title: 'View Profile',
                to: '/dashboard/profile/view',
                p: "view"
            },
            {
                title: 'Edit Profile',
                to: '/dashboard/profile/edit',
                p: "edit"
            },
        ]
    } 
];
