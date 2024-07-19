export const MenuList = [
    {
        title: 'Dashboard',	
        classsChange: 'mm-collapse',
        to: "/dashboard",		
        iconStyle: <i className="material-icons">grid_view</i>,
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
                title: 'Recovered',
                to: '/dashboard/recovered',
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

export const AdminMenuList = [
    {
        title: 'User Management',
        classsChange: 'mm-collapse',
        to: "/admin/admin-dashboard/users",
        iconStyle: <i className="material-icons">supervised_user_circle</i>,
    },
    {
        title: 'Admin Management',
        classsChange: 'mm-collapse',
        to: "/admin/admin-dashboard/admin",
        iconStyle: <i className="material-icons">admin_panel_settings</i>,
    },
    // {
    //     title: 'Finance',
    //     classsChange: 'mm-collapse',
    //     to: "/admin/admin-finance/",
    //     iconStyle: <i className="material-icons">attach_money</i>,
    // },
    {
        title: 'Website',
        classsChange: 'mm-collapse',
        to: "/admin/admin-webmgt/",
        iconStyle: <i className="material-icons">web</i>,
    },  
    {
        title: 'Web Management',
        classsChange: 'mm-collapse',
        to: "/admin/admin-website/",
        iconStyle: <i className="material-icons">language</i>,
        
    },  
    {
        title: 'Testimonials',
        classsChange: 'mm-collapse',
        to: "/admin/admin-testimonials/",
        iconStyle: <i className="material-icons">book</i>,
        
    },
    {
        title: 'CRM Management',
        classsChange: 'mm-collapse',
        to: "/admin/admin-dashboard/crm",
        iconStyle: <i className="material-icons">contacts</i>,
    },
    // {
    //     title: 'Profile',
    //     classsChange: 'mm-collapse',
    //     to: "",
    //     iconStyle: <i className="material-icons">person</i>,
    //     content: [
    //         {
    //             title: 'View Profile',
    //             to: '/admin/admin-dashboard/profile',
    //             p: "view"
    //         },
    //         {
    //             title: 'Edit Profile',
    //             to: '/admin/admin-dashboard/profile',
    //             p: "edit"
    //         },
    //     ]
    // }
];


export const AdminMenuList2 = [
    {
        title: 'User Management',	
        classsChange: 'mm-collapse',
        to: "/admin/admin-dashboard",		
        iconStyle:  <i class="material-icons">supervised_user_circle</i>,
    }, 
   
        {
            title: 'CRM Management',	
            classsChange: 'mm-collapse',
            to: "/admin/admin-dashboard/crm",		
            iconStyle:  <i class="material-icons">admin_panel_settings</i>,
        },
    {
        title: 'Profile',
        classsChange: 'mm-collapse',
        to: "", 
        iconStyle: <i className="material-icons">person</i>, 
        content: [
            {
                title: 'View Profile',
                to: '/admin/admin-dashboard/profile',
                p: "view"
            },
            {
                title: 'Edit Profile',
                to: '/admin/admin-dashboard/profile',
                p: "edit"
            },
        ]
    } 
]