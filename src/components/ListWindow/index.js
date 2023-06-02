import './style.css'
import ListObject from "../ListObject"
import { Box } from '@mui/material'
import { Masonry } from '@mui/lab'

const ListWindow = ({ allLists, setTriggerReload, handleDeleteList } ) => {
  return (
    <Box display="flex" justifyContent="center" id="listwindowid">
      <Masonry columns={{xs: 1, sm: 2, lg: 3}} spacing={2}>
        {allLists.map(list => (
          <ListObject
          key={list.listId}
          list={list}
          setTriggerReload={setTriggerReload}
          handleDeleteList={handleDeleteList}
          />
        ))}
      </Masonry>
    </Box>
  )
}
  
export default ListWindow