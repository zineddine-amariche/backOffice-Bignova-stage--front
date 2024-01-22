import React from "react";

import {
  DataGrid,
  GridColDef,
  GridFooterContainer,
  GridValueGetterParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridPagination,
} from "@mui/x-data-grid";

import Pagination from "@mui/material/Pagination";

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="secondary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

const CustomFooter = () => {
  return (
    <GridFooterContainer>
      <CustomPagination />
      <GridPagination />
    </GridFooterContainer>
  );
};

export default CustomPagination;
export { CustomFooter };
