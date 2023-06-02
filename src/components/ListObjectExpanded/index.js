import './style.css'
import { useState } from 'react';
import React from "react";
import { Dialog, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Popover, FormControl, OutlinedInput, InputAdornment, FormHelperText, TextField } from "@mui/material";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import { patch, get, post, deleted } from '../../service/apiClient';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmAction from '../ConfirmAction';

const ListObjectExpanded = ({isOpen, handleClose, currentList, setCurrentList, listItems, setListItems}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [newItemText, setNewItemText] = useState("")
    const [editItemText, setEditItemText] = useState("")
    const [editItemId, setEditItemId] = useState("")
    const [confirmOpen, setConfirmOpen] = useState(false)
    const listTitle = currentList.name
    const listDescription = currentList.description

    const open = Boolean(anchorEl);
    const id = open ? 'text-field-popover' : undefined;

    const handleEditOpen = (item) => (event) => {
        setAnchorEl(event.currentTarget);
        setEditItemId(item.itemId)
        setEditItemText(item.itemText)
    }

    const handleEditClose = () => {
        setAnchorEl(null);
    }

    const handleChangeEdit = (e) => {
        setEditItemText(e.target.value)
    }

    const handleChange = (e) => {
        setNewItemText(e.target.value)
    }

    const fetchCurrentList = async () => {
        const updatedCurrentItem = await get(`lists/${currentList.listId}`)
        setCurrentList(updatedCurrentItem)
        setListItems(updatedCurrentItem.items)
    }

    const submitItemEdit = async () => {
        await patch(`lists/${currentList.listId}/items/${editItemId}`, {"itemText":editItemText})
        setAnchorEl(null);
        fetchCurrentList()
      };

    const addNewItem = async () => {
        await post(`lists/${currentList.listId}/items`, {"itemText":newItemText})
        fetchCurrentList()
        setNewItemText("")
    }

    const deleteItem = async (item) => {
        console.log("DELETEITEM")
        await deleted(`lists/${currentList.listId}/items/${item.itemId}`, {"itemId":item.itemId})
        fetchCurrentList()
    }

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
                    {listItems.map(item => 
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
                                <IconButton onClick={handleEditOpen(item)}>
                                    <EditIcon size="small"/>
                                </IconButton>
                                <div>
                                <IconButton onClick={() => setConfirmOpen(true)}>
                                    <DeleteIcon size="small"/>
                                </IconButton>
                                <ConfirmAction
                                    title="Delete Item?"
                                    open={confirmOpen}
                                    setOpen={setConfirmOpen}
                                    onConfirm={() => deleteItem(item)}
                                >
                                    Are you sure you want to delete this item?
                                </ConfirmAction>
                                </div>
                            </ListItemIcon>
                        </ListItem>
                        )}
                </List>
                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        label="Add New Item"
                        multiline
                        value={newItemText}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={addNewItem}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Box>
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
                    value={editItemText}
                    onChange={handleChangeEdit}
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
                <FormHelperText>Edit List Item</FormHelperText>
            </FormControl>
        </Popover>
        </>
    )
}

export default ListObjectExpanded