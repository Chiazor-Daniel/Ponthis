const iconSize = { fontSize: '24px', color: '' };

export const MenuList = [
  {
    title: 'Dashboard',
    classsChange: 'mm-collapse',
    to: "/dashboard",
    iconStyle: <i className="material-icons" style={iconSize}>grid_view</i>,
  },
  {
    title: 'Assets',
    classsChange: 'mm-collapse',
    to: "/dashboard/assets",
    iconStyle: <i className="material-icons" style={iconSize}>monetization_on</i>,
  },
  {
    title: 'Transactions',
    classsChange: 'mm-collapse',
    to: "",
    iconStyle: <i className="material-icons" style={iconSize}>account_balance</i>,
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
    title: 'Cards',
    classsChange: 'mm-collapse',
    to: "/dashboard/cards",
    iconStyle: <i className="material-icons" style={iconSize}>credit_card</i>,
  },
  {
    title: 'Recovered',
    classsChange: 'mm-collapse',
    to: "/dashboard/recovered",
    iconStyle: <i className="material-icons" style={iconSize}>replay</i>,
  },
  {
    title: 'Profile',
    classsChange: 'mm-collapse',
    to: "",
    iconStyle: <i className="material-icons" style={iconSize}>person</i>,
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

export const AdditionalMenuList = [
  {
    title: 'Settings',
    classsChange: 'mm-collapse',
    to: "/dashboard/settings",
    iconStyle: <i className="material-icons" style={iconSize}>settings</i>,
  },
  {
    title: 'Logout',
    classsChange: 'mm-collapse',
    to: "/logout",
    iconStyle: <i className="material-icons" style={iconSize}>exit_to_app</i>,
  }
];

export const AdminMenuList = [
  {
    title: 'User Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/users",
    iconStyle: <i className="material-icons" style={iconSize}>supervised_user_circle</i>,
  },
  {
    title: 'Admin Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/admin",
    iconStyle: <i className="material-icons" style={iconSize}>admin_panel_settings</i>,
  },
  {
    title: 'Assets',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/assets",
    iconStyle: <i className="material-icons" style={iconSize}>attach_money</i>,
  },
  {
    title: 'Website',
    classsChange: 'mm-collapse',
    to: "/admin/admin-webmgt/",
    iconStyle: <i className="material-icons" style={iconSize}>web</i>,
  },
  {
    title: 'Web Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-website/",
    iconStyle: <i className="material-icons" style={iconSize}>language</i>,
  },
  {
    title: 'Testimonials',
    classsChange: 'mm-collapse',
    to: "/admin/admin-testimonials/",
    iconStyle: <i className="material-icons" style={iconSize}>book</i>,
  },
  {
    title: 'CRM Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/crm",
    iconStyle: <i className="material-icons" style={iconSize}>contacts</i>,
  }
];

export const AdminMenuList2 = [
  {
    title: 'User Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard",
    iconStyle: <i className="material-icons" style={iconSize}>supervised_user_circle</i>,
  },
  {
    title: 'CRM Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/crm",
    iconStyle: <i className="material-icons" style={iconSize}>admin_panel_settings</i>
  },
    {
      title: 'Profile',
      classsChange: 'mm-collapse',
      to: "",
      iconStyle: <i className="material-icons" style={iconSize}>person</i>,
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
  ];