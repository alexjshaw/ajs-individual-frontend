import './style.css'
import React from "react";
import { Dialog, Box } from "@mui/material";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import SingleListItem from "../SingleListItem";

const ListObjectExpanded = ({isOpen, handleClose, listItem}) => {

    const listTitle = listItem.name
    const listDescription = listItem.description
    const items = listItem.items

    return (
        <>
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md"
        sx={{
            "& .MuiPaper-root": {
              borderRadius: "10px",
              "maxWidth": "500px",
              backgroundColor: 'transparent'
                },
                backdropFilter: "blur(5px)"
            }}
        >
            <Box className="listcontainerexpanded">
                <Box className="listtitlebar">
                    <span>{listTitle}</span>
                    <Box className="listtitleicons">
                        <IconButton aria-label="Add List Item Button">
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label="List Options Button">
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box className="listcontentexpanded">
                    <Box className="listdescription">
                        <CircleIcon fontSize="small" sx={{mr: "5px"}}/>
                        <span>{listDescription}</span>
                    </Box>
                    <Box className="listitems">
                        {items.map(item => 
                            <SingleListItem
                                key={item.itemId}
                                text={item.itemText}
                                />
                            )}
                    </Box>
                </Box>
            </Box>
        </Dialog>
        </>
    )
}

export default ListObjectExpanded