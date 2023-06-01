import './style.css'
import { useState } from 'react';
import React from "react";
import { Dialog, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Popover, FormControl, OutlinedInput, InputAdornment, FormHelperText } from "@mui/material";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import SingleListItem from "../SingleListItem";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';

const ListObjectExpanded = ({isOpen, handleClose, listItem, listItems, setListItems}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [newItemText, setNewItemText] = useState("")
    const listTitle = listItem.name
    const listDescription = listItem.description
    console.log("listItem", listItem)

    const open = Boolean(anchorEl);
    const id = open ? 'text-field-popover' : undefined;

    const handleEditOpen = (event) => {
        setAnchorEl(event.currentTarget);
        const listItem = event.target.closest('.MuiListItem-root');
        const itemText = listItem.querySelector('.MuiTypography-root').textContent;
        console.log("listItem", listItem)
        console.log("itemText", itemText)
        setNewItemText(itemText);
    }

    const handleEditClose = () => {
        setAnchorEl(null);
    }

    const handleChange = (e) => {
        setNewItemText(e.target.value)
        console.log(newItemText)
    }

    const submitItemEdit = () => {
        setAnchorEl(null);
    
        // Update the edited item in listItems
        const updatedItems = listItems.map((item) => {
            console.log(item.itemId)
            console.log(listItems.itemId)
          if (item.itemId === listItems.itemId) {
            return {
              ...item,
              itemText: newItemText,
            };
          }
          return item;
        });
    
        // Update the listItems state with the edited item
        setListItems(updatedItems);
      };

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
                    <IconButton aria-label="Add Favourite Service">
                        <FavoriteBorderIcon />
                    </IconButton>
                        <Typography variant="h6">
                        {listTitle}
                        </Typography>
                    <IconButton aria-label="Edit Service">
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
                <Box className="listcontentexpanded">
                    <Box className="listdescription">
                    <Typography variant="body1" align="center" sx={{fontWeight: 'bold'}}>
                        {listDescription}
                    </Typography>
                    </Box>
                    <List className="listitems">
                    {listItems.slice(0,5).map(item => 
                        <ListItem key={item.itemId} disablePadding>
                            <ListItemIcon sx={{minWidth: "25px"}}>
                                <CircleIcon fontSize="12px" />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography variant="body1">
                                {item.itemText}
                                </Typography>
                                } />
                            <ListItemIcon sx={{minWidth: "25px"}}>
                                <IconButton onClick={handleEditOpen}>
                                    <EditIcon size="small"/>
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        )}
                </List>
                </Box>
            </Box>
        </Dialog>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleEditClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                <OutlinedInput
                    type={'text'}
                    value={newItemText}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Submit New List Item"
                                onClick={submitItemEdit}
                                edge="end"
                                >
                                    <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText>Create New List Item</FormHelperText>
            </FormControl>
        </Popover>
        </>
    )
}

export default ListObjectExpanded