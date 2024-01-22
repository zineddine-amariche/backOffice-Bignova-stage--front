import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  PublicOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  BookOutlined,
} from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import profileImage from "../../assets/user.png";
import logo from "../../assets/logo.png";
import CustDrawer from "./components/Drawer";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Admins",
    icon: null,
  },
  {
    text: "Users",
    icon: <Groups2Outlined />,
  },
  {
    text: "Calendar",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Recruitment",
    icon: <PublicOutlined />,
  },
  {
    text: "Gestion",
    icon: null,
  },
  {
    text: "Blogs",
    icon: <BookOutlined />,
  },
  {
    text: "Manage",
    icon: null,
  },
  {
    text: "Documentation",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <CustDrawer
        user={user}
        anchor="left"
        drawerWidth={drawerWidth}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isNonMobile={isNonMobile}
      >
        <Box width="100%">
          <Header isSidebarOpen={isSidebarOpen} />
        </Box>
        <ListItems
          navItems={navItems}
          setActive={setActive}
          active={active}
          isSidebarOpen={isSidebarOpen}
          navigate={navigate}
        />
        <BottomItems isSidebarOpen={isSidebarOpen} />
      </CustDrawer>
    </Box>
  );
};

export default Sidebar;

const Header = ({ isSidebarOpen }) => {
  const theme = useTheme();

  return (
    <>
      {isSidebarOpen && (
        <Box m="2rem 2rem 1.4rem 3rem">
          <FlexBetween color={theme.palette.secondary.light}>
            <Box display="flex" alignItems="center" gap=".5rem">
              <Typography variant="h4" fontWeight="bold">
                BIGNOVA-BO
              </Typography>
            </Box>
          </FlexBetween>
        </Box>
      )}
      {!isSidebarOpen && (
        <Box
          m="2rem 0rem 1.4rem 20px"
          display={"flex"}
          alignItems="center"
          component={"img"}
          src={logo}
          width={"30px"}
          height="30px"
        />
      )}
    </>
  );
};

const ListItems = ({
  navItems,
  setActive,
  active,
  isSidebarOpen,
  navigate,
}) => {
  const theme = useTheme();

  return (
    <List>
      {navItems.map(({ text, icon }) => {
        if (!icon) {
          return (
            <Typography
              key={text}
              sx={{
                m: !isSidebarOpen ? "2rem 0 1rem 1rem" : "2rem 0 1rem 2rem",
                fontSize: !isSidebarOpen ? "11px" : "14px",
              }}
            >
              {text}
            </Typography>
          );
        }
        const lcText = text.toLowerCase();

        return (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/${lcText}`);
                setActive(lcText);
              }}
              sx={{
                backgroundColor:
                  active === lcText
                    ? theme.palette.secondary[700]
                    : "transparent",
                color:
                  active === lcText
                    ? theme.palette.grey[100]
                    : theme.palette.primary[100],
              }}
            >
              <ListItemIcon
                sx={{
                  ml: !isSidebarOpen ? ".5rem" : " .7rem", // reduced the margin left value
                  color:
                    active === lcText
                      ? theme.palette.grey[100]
                      : theme.palette.primary[200],
                }}
              >
                {icon}
              </ListItemIcon>
              {text.length > 13 ? (
                <Tooltip title={text}>
                  <ListItemText primary={text.substring(0, 13) + "..."} />
                </Tooltip>
              ) : (
                <ListItemText primary={text} />
              )}

              {active === lcText && <ChevronRightOutlined />}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

const BottomItems = ({ isSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box position="absolute" bottom="0" width="100%">
      <Divider />
      <FlexBetween>
        <Button
          onClick={isSidebarOpen && handleClick}
          sx={{
            width: "100%",
            display: "flex",
            textTransform: "none",
            gap: "1rem",
            marginY: "1rem",
            paddingY: "1rem",
          }}
          endIcon={isSidebarOpen && <MoreHorizIcon />}
        >
          <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="40px"
            width="40px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          {isSidebarOpen && (
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {"Reda Bekka"}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {"All permission"}
              </Typography>
            </Box>
          )}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/${"profile"}`);
            }}
          >
            My profile
          </MenuItem>
          <MenuItem onClick={handleClose}>Add a manager</MenuItem>{" "}
          {/* added a menu item for addiing a manager */}
          <MenuItem onClick={handleClose}>Log Out</MenuItem>
        </Menu>
      </FlexBetween>
    </Box>
  );
};
