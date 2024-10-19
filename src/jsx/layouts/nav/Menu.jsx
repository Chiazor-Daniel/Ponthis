import { FaTh, FaMoneyBillAlt, FaBalanceScale, FaCreditCard, FaUndo, FaWallet, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md'; // Example for Material Design icons from React Icons
import { AiOutlineUser } from 'react-icons/ai'; // Add other icon imports as needed

const iconSize = { fontSize: '24px', color: '' };

export const MenuList = [
  {
    title: 'Dashboard',
    classsChange: 'mm-collapse',
    to: "/dashboard",
    iconStyle: <FaTh style={iconSize} />,
  },
  {
    title: 'Assets',
    classsChange: 'mm-collapse',
    to: "/dashboard/assets",
    iconStyle: <FaMoneyBillAlt style={iconSize} />,
  },
  {
    title: 'Transactions',
    classsChange: 'mm-collapse',
    to: "",
    iconStyle: <FaBalanceScale style={iconSize} />,
    content: [
      // {
      //   title: 'View transactions',
      //   to: '/dashboard/view-transactions',
      // },
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
    iconStyle: <FaCreditCard style={iconSize} />,
  },
  {
    title: 'Recovered',
    classsChange: 'mm-collapse',
    to: "/dashboard/recovered",
    iconStyle: <FaUndo style={iconSize} />,
  },
  {
    title: 'Loans',
    classsChange: 'mm-collapse',
    to: "/dashboard/loan-app",
    iconStyle: <FaWallet style={iconSize} />,
  },
  {
    title: 'Profile',
    classsChange: 'mm-collapse',
    to: "",
    iconStyle: <FaUser style={iconSize} />,
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
    iconStyle: <MdSettings style={iconSize} />,
  },
  {
    title: 'Logout',
    classsChange: 'mm-collapse',
    to: "/logout",
    iconStyle: <FaSignOutAlt style={iconSize} />,
  }
];

export const AdminMenuList = [
  {
    title: 'User Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/users",
    iconStyle: <AiOutlineUser style={iconSize} />,
  },
  {
    title: 'Admin Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/admin",
    iconStyle: <MdSettings style={iconSize} />,
  },
  {
    title: 'Assets',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/assets",
    iconStyle: <FaMoneyBillAlt style={iconSize} />,
  },
  {
    title: 'Website',
    classsChange: 'mm-collapse',
    to: "/admin/admin-webmgt/",
    iconStyle: <FaTh style={iconSize} />, // Adjust as needed
  },
  {
    title: 'Web Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-website/",
    iconStyle: <MdSettings style={iconSize} />, // Adjust as needed
  },
  {
    title: 'Testimonials',
    classsChange: 'mm-collapse',
    to: "/admin/admin-testimonials/",
    iconStyle: <FaBalanceScale style={iconSize} />, // Adjust as needed
  },
  {
    title: 'CRM Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/crm",
    iconStyle: <AiOutlineUser style={iconSize} />, // Adjust as needed
  },
  {
    title: 'Reviews',
    classsChange: 'mm-collapse',
    to: "/admin/admin-website/reviews",
    iconStyle: <FaUser style={iconSize} />, // Adjust as needed
  }
];

export const AdminMenuList2 = [
  {
    title: 'User Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard",
    iconStyle: <AiOutlineUser style={iconSize} />,
  },
  {
    title: 'CRM Management',
    classsChange: 'mm-collapse',
    to: "/admin/admin-dashboard/crm",
    iconStyle: <MdSettings style={iconSize} />
  },
  {
    title: 'Profile',
    classsChange: 'mm-collapse',
    to: "",
    iconStyle: <FaUser style={iconSize} />,
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
