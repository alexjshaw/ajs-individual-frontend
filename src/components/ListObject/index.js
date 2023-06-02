import './style.css'
import { useState, useEffect } from 'react';
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
import { post, get, deleted, patch } from '../../service/apiClient';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmAction from '../ConfirmAction';

const ListObject = ({ list, setTriggerReload, allLists, setAllLists, fetchAllLists }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [newItemText, setNewItemText] = useState("")
    const [currentList, setCurrentList] = useState(list)
    const [currentListItems, setCurrentListItems] = useState(list.items)
    const [isFavourite, setIsFavourite] = useState(list.favourite)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const {listId, name, favourite, description} = currentList
    
    useEffect(() => {
        if (favourite) {
            setIsFavourite(true)
        } else {
            setIsFavourite(false)
        }
    },[])

    useEffect(() => {
        setCurrentList(list)
        setCurrentListItems(list.items)
        setIsFavourite(list.favourite)
    }, [allLists])

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

    const addNewListItem = async () => {
        await post(`lists/${listId}/items`,{"itemText":newItemText})
        await fetchAllLists()
        handleAddItemClose()
        setNewItemText("")
    }

    const toggleFavourite = async () => {
        await patch(`lists/${listId}`, {"favourite":(!favourite)})
        fetchAllLists()
    }

    const deleteList = async () => {
        console.log(listId)
        await deleted(`lists/${listId}`,{listId})
        await fetchAllLists()
    }

    const handleChange = (e) => {
        setNewItemText(e.target.value)
    }            

    const open = Boolean(anchorEl);
    const id = open ? 'text-field-popover' : undefined;

    return (

        <Box className="listcontainer">
            <Box className="listtitlebar">
                <IconButton aria-label="Add List to Favourites" onClick={toggleFavourite}>
                    {!isFavourite && <FavoriteBorderOutlined />}
                    {isFavourite && <FavoriteIcon style={{fill: "red"}} />}

                </IconButton>
                <Typography variant="h6">
                    {name}
                </Typography>
                <div>
                <IconButton aria-label="Delete List" onClick={() => setConfirmOpen(true)}>
                    <DeleteIcon />
                </IconButton>
                <ConfirmAction
                    title="Delete Post?"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={deleteList}
                >
                    Are you sure you want to delete this list?
                </ConfirmAction>
                </div>
            </Box>
            <Box className="listcontent">
                <Box>
                    <Typography variant="body1" align="center" sx={{fontWeight: 'bold'}}>
                        {description}
                    </Typography>
                </Box>
                <List className="listitems">
                    {currentListItems.slice(0,5).map(item => 
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
                {currentListItems.length > 5 && 
                    <Button variant="text" startIcon={<ExpandMoreIcon />} onClick={handleOpen} >
                        <span>Show {currentListItems.length - 5} more</span>
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
                                onClick={addNewListItem}
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
        <ListObjectExpanded
        isOpen={isOpen}
        handleClose={handleClose}
        currentList={currentList}
        setCurrentList={setCurrentList}
        currentListItems={currentListItems}
        isFavourite={isFavourite}
        fetchAllLists={fetchAllLists}
        allLists={allLists} />
        </Box>
        
    )
}

export default ListObject