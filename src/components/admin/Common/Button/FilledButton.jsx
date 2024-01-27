import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Button} from "@mui/material";
import React from "react";

export default function FilledButton({children}) {
    return(
        <Button
            sx={{float: 'right'}}
            variant="contained"
            endIcon={<BorderColorIcon />}>
            {children}
        </Button>
    );
}
