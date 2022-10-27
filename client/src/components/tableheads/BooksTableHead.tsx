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
  image: string;
  title: string;
  author: string;
  publisher: string;
}

export type BooksOrder = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: BooksOrder;
  orderBy: string;
  rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state: RootState) => state);

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  if (books.isLoading) {
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
  if (books.error) {
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
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
    },
    {
      id: "image",
      numeric: false,
      disablePadding: false,
      label: "Cover",
    },
    {
      id: "author",
      numeric: false,
      disablePadding: false,
      label: "Author",
    },
    {
      id: "publisher",
      numeric: false,
      disablePadding: false,
      label: "Publisher",
    },
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
