import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import * as React from "react";

export default function DeleteBtn() {
    return(
        <Button
            sx={{float: 'right'}}
            variant="outlined"
            startIcon={<DeleteIcon />}>
            Delete
        </Button>
    );
}