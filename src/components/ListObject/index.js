import './style.css'
import { useState } from 'react';
import { Box, IconButton, Button, Typography, List, ListItem, ListItemIcon, ListItemText, Popover, TextField, InputAdornment, OutlinedInput, FormControl, FormHelperText } from "@mui/material"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import SingleListItem from '../SingleListItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import ListObjectExpanded from '../ListObjectExpanded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FavoriteBorderOutlined } from '@mui/icons-material';

const ListObject = ({listItem}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [newItemText, setNewItemText] = useState("")

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAddItemOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleAddItemClose = () => {
        setAnchorEl(null);
    }

    const submitListItem = () => {
        console.log("SUBMIT LIST ITEM")
        console.log(newItemText)
        setAnchorEl(null)
    }

    const handleChange = (e) => {
        setNewItemText(e.target.value)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'text-field-popover' : undefined;

    const listTitle = listItem.name
    const listDescription = listItem.description
    const items = listItem.items

    return (
        <>
        <Box className="listcontainer">
            <Box className="listtitlebar">
                <IconButton aria-label="Add List to Favourites">
                    <FavoriteBorderOutlined />
                </IconButton>
                <Typography variant="h6">
                    {listTitle}
                </Typography>
                <IconButton aria-label="Edit List">
                    <MoreHorizIcon />
                </IconButton>
            </Box>
            <Box className="listcontent">
                <Box>
                    <Typography variant="body1" align="center" sx={{fontWeight: 'bold'}}>
                        {listDescription}
                    </Typography>
                </Box>
                <List className="listitems">
                    {items.slice(0,5).map(item => 
                        <ListItem key={item.itemId} disablePadding>
                            <ListItemIcon sx={{minWidth: "25px"}}>
                                <CircleIcon fontSize="12px" />
                            </ListItemIcon>

                            <ListItemText primary={
                                <Typography variant="body2">
                                {item.itemText}
                                </Typography>
                                } />
                    
                        </ListItem>
                        )}
                </List>
                {items.length > 5 && 
                    <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={handleOpen} >
                        <span>Show {items.length - 5} more</span>
                    </Button>}
            </Box>
            <Box className="listbuttons" sx={{display:"flex", justifyContent:"center"}}>
                <Button variant="outlined" onClick={handleAddItemOpen}>Add Item</Button>
                <Popover 
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleAddItemClose}
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
                                    onClick={submitListItem}
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
                <Button variant="outlined" onClick={handleOpen}>Edit List</Button>
            </Box>
        </Box>
        <ListObjectExpanded isOpen={isOpen} handleClose={handleClose} listItem={listItem} />
        </>
    )
}

export default ListObject