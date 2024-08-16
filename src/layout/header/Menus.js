import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    subMenu: [
      { href: "/", label: "Personal Banking" },
      { href: "/business-banking", label: "Business Banking" },
      { href: "/loans", label: "Loans" },
    ],
  },
  {
    title: "Transactions",
    subMenu: [
      { href: "/transactions", label: "Our Transactions" },
    ],
  },
  {
    title: "Cards",
    subMenu: [
      { href: "/cards", label: "Cards Management" },
    ],
  },
  {
    title: "Services",
    subMenu: [
      { href: "/service", label: "Our Services" },
      // { href: "/service-details", label: "Service Details" },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const DaskTopMenusMenus = () => {
  return (
    <ul className="nav_scroll">
      {menuItems.map((menuItem, index) => (
        <li key={index}>
          {menuItem.subMenu ? (
            <>
              <a href="#">
                {menuItem.title}{" "}
                <span>
                  <i className="fas fa-angle-down" />
                </span>
              </a>
              <ul className="sub-menu">
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link legacyBehavior href={subMenuItem.href}>
                      <a>{subMenuItem.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link legacyBehavior href={menuItem.href}>
              <a>{menuItem.label}</a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
