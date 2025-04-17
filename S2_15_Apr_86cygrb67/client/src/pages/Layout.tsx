
import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./topbar";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <TopBar />
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
