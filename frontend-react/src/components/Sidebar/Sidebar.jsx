import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { createStyles, Navbar, Group, getStylesRef, rem } from "@mantine/core";
import { IconHome, IconLogout, IconBriefcase } from "@tabler/icons-react";
import JobsList from "../JobsList/JobsList";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { ActivePageContext } from "../../contexts/activePageContext";
import { AuthContext } from "../../contexts/authContext";

const useStyles = createStyles((theme) => ({
  navbar: {
    height: "90vh",
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: "/home", label: "Home", icon: IconHome },
  { link: "/home/jobs", label: "Jobs", icon: IconBriefcase },
  // { link: "", label: "Notifications", icon: IconBellRinging },
  // { link: "", label: "Other Settings", icon: IconSettings },
];

function Sidebar() {
  const { classes, cx } = useStyles();
  const { Logout } = useContext(AuthContext);
  // const { activePage, setActivePage } = useContext(ActivePageContext);
  // const [active, setActive] = useState("Home");

  // const routeMap = {
  //   Home: "",
  //   Jobs: "jobs",
  // };

  const links = data.map((item) => (
    <NavLink
      // className={cx(classes.link, {
      //   [classes.linkActive]: item.label === active,
      // })}

      end
      to={item.link}
      className={({ isActive }) => {
        // console.log(active);
        return cx(classes.link, {
          [classes.linkActive]: isActive,
        });
      }}
      key={item.label}
      // onClick={(event) => {
      //   event.preventDefault();
      //   // setActive(item.label);
      //   // console.log(item.link);
      //   navigate(item.link);
      // }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <>
      <Navbar
        height={700}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
        style={{ zIndex: 200 }}
      >
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <p className="sidebar-logo">Menu</p>
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          {/* <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}

          <a className={classes.link} onClick={(e) => Logout()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    </>
  );
}

export default Sidebar;
