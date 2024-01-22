import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./styles.css";
import Head from "../../components/Head";
import { UserData, RoleColors } from "../../data/userMockData";
import Pills from "./components/pills";
import DrawerInfo from "./components/drawerInfo";
import InfoCard from "./components/infoCard";
import CustomPagination, { CustomFooter } from "./components/customPagination";

const Users = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    profilePicture: "user1.png",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    role: 1,
    createdAt: "",
  });

  const handleOpen = (value: number) => {
    //looping over the user data and retrieving the user that matches with the id
    UserData.forEach((user) => {
      if (user.id === value) {
        setUserInfo(user);
      }
    });

    setIsOpen(true); // opening the sidebar
  };

  // columns of user the table { profile picture, fullname, email, role, created on, and details button}
  const columns: GridColDef[] = [
    {
      field: "profilePicture",
      align: "center",
      headerAlign: "center",
      headerName: "Avatar",
      minWidth: 150,
      renderCell: (image) => {
        return (
          <Box
            component="img"
            alt="profile"
            src={image.value}
            height="40px"
            width="40px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
        );
      },
    },
    {
      field: "fullname",
      align: "center",
      headerAlign: "center",
      headerName: "fullname",
      minWidth: 200,
    },

    {
      field: "email",
      align: "center",
      headerAlign: "center",
      headerName: "email",
      type: "string",
      minWidth: 250,
    },
    {
      field: "role",
      align: "center",
      headerAlign: "center",
      headerName: "role",
      minWidth: 100,
      renderCell: (roleValue) => {
        let role = {
          label: "",
          color: "",
        };
        //generating the pill color according to the role the user has
        RoleColors.forEach((element) => {
          if (roleValue.value === element.id) {
            role = {
              label: element.role,
              color: element.color,
            };
            //console.log(role);
            return;
          }
        });

        return (
          <Box>
            <Pills bgColorPill={role.color} text={role.label} />
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      align: "center",
      headerAlign: "center",
      headerName: "created on",
      type: "string",
      minWidth: 100,
    },
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      headerName: "Details",
      minWidth: 100,
      renderCell: (cellValue) => {
        return (
          <Box onClick={() => handleOpen(cellValue.value)}>
            <MoreHorizIcon fontSize="large" sx={{ cursor: "pointer" }} />
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      height={"100%"}
      sx={{ backgroundColor: theme.palette.background.paper }}
      className="dashboard"
    >
      <Head title="Users" />

      <div style={{ backgroundColor: theme.palette.background.default }}>
        <DataGrid
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: 2,
            m: 3,
          }}
          autoHeight
          rows={UserData}
          density="comfortable"
          disableSelectionOnClick={true}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          /* overriding the footer to add custom pagination to the left */
          localeText={{
            footerRowSelected: CustomPagination,
          }}
          components={{
            Footer: CustomFooter,
          }}
        />
      </div>
      <DrawerInfo
        isDrawerInfoOpen={isOpen}
        handleCloseDrawer={() => setIsOpen(false)}
      >
        <InfoCard
          informationUser={userInfo}
          handleClick={() => setIsOpen(false)}
        />
      </DrawerInfo>
    </Box>
  );
};

export default Users;
