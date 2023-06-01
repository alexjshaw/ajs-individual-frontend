import "./style.css"
import { Box } from "@mui/material"

const SingleListItem = ({text}) => {
    return (
            <Box className="singlelistitem">{text}</Box>
    )
}

export default SingleListItem