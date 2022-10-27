import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import { getAllBooks } from "services/book-services";

export interface Data {
  lastName: string;
  firstName: string;
  email: string;
  // isAdmin?: string;
  // _id: string;
}

export type UsersOrder = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: UsersOrder;
  orderBy: string;
  rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state);

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  if (users.isLoading) {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">Loading...</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  if (users.error) {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">ERROR</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "lastName",
      numeric: false,
      disablePadding: false,
      label: "Lastname",
    },
    {
      id: "firstName",
      numeric: false,
      disablePadding: false,
      label: "Firstname",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    // {
    //   id: "isAdmin",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Role",
    // },
    // {
    //   id: "_id",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "ID",
    // },
  ];

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "#111",
          borderBottom: "2px solid #363433",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            align="center"
            sx={{
              borderRight: "2px solid #363433",
              fontSize: "1.3rem",
              color: "#fff",
            }}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  color: "#fff",
                }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span">
                  {order === "desc" ? (
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#fff",
                      }}
                    >
                      : sorted descending
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#fff",
                      }}
                    >
                      : sorted ascending
                    </Typography>
                  )}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
