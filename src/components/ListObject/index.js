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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { post, get, deleted } from '../../service/apiClient';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmAction from '../ConfirmAction';

const ListObject = ({list, setTriggerReload, handleDeleteList}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [newItemText, setNewItemText] = useState("")
    const [currentList, setCurrentList] = useState(list)
    const [listItems, setListItems] = useState(list.items)
    const [isFavourite, setIsFavourite] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

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

    const fetchCurrentList = async () => {
        const updatedCurrentItem = await get(`lists/${currentList.listId}`)
        setCurrentList(updatedCurrentItem)
        setListItems(updatedCurrentItem.items)
    }

    const submitListItem = async () => {
        await post(`lists/${currentList.listId}/items`, {"itemText":newItemText})
        setAnchorEl(null);
        fetchCurrentList()
        setNewItemText("")
    }

    const deleteList = async () => {
        await deleted(`lists/${currentList.listId}`, {"listId":currentList.listId})
        handleDeleteList(currentList.listId)
    }

    const handleChange = (e) => {
        setNewItemText(e.target.value)
    }

    const testFunction = () => {
        console.log(currentList)
        console.log(listItems)
    }

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'text-field-popover' : undefined;

    const listTitle = list.name
    const listDescription = list.description

    return (
        <>
        <Box className="listcontainer">
            <Box className="listtitlebar">
                <IconButton aria-label="Add List to Favourites" onClick={toggleFavourite}>
                    {!isFavourite && <FavoriteBorderOutlined />}
                    {isFavourite && <FavoriteIcon style={{fill: "red"}} />}

                </IconButton>
                <Typography variant="h6" onClick={testFunction}>
                    {listTitle}
                </Typography>
                <div>
                <IconButton aria-label="Delete List" onClick={() => setConfirmOpen(true)}>
                    <DeleteIcon />
                </IconButton>
                <ConfirmAction
                    title="Delete Post?"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={() => deleteList()}
                >
                    Are you sure you want to delete this post?
                </ConfirmAction>
                </div>
            </Box>
            <Box className="listcontent">
                <Box>
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
                                <Typography variant="body2">
                                {item.itemText}
                                </Typography>
                                } />
                        </ListItem>
                        )}
                </List>
                {listItems.length > 5 && 
                    <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={handleOpen} >
                        <span>Show {listItems.length - 5} more</span>
                    </Button>}
            </Box>
            <Box className="listbuttons" sx={{display:"flex", justifyContent:"center", pb:"12px"}}>
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
                    <TextField
                        required
                        type={'text'}
                        value={newItemText}
                        onChange={handleChange}
                        label="Create New List Item"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Submit New List Item"
                                onClick={submitListItem}
                                edge="end"
                                >
                                <AddIcon />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                    </FormControl>

                </Popover>
                <Button variant="outlined" onClick={handleOpen}>Edit List</Button>
            </Box>
        </Box>
        <ListObjectExpanded isOpen={isOpen} handleClose={handleClose} currentList={currentList} setCurrentList={setCurrentList} listItems={listItems} setListItems={setListItems}/>
        </>
    )
}

export default ListObject