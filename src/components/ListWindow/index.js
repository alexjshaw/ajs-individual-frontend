import './style.css'
import ListObject from "../ListObject"
import { Box } from '@mui/material'
import { Masonry } from '@mui/lab'

const ListWindow = ({ lists } ) => {
  return (
    <Box display="flex" justifyContent="center" id="listwindowid">
      <Masonry columns={{xs: 1, sm: 2, lg: 3}} spacing={2}>
        {lists.map(listObject => (
          <ListObject
          key={listObject.listId}
          listItem={listObject}
          />
        ))}
      </Masonry>
    </Box>
  )
}
  
export default ListWindow