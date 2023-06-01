import { Box } from "@mui/material"
import ServiceObject from "../ServiceObject"
import { Masonry } from "@mui/lab"

const ActiveServicesWindow = ({services}) => {

    return (
        <Box display="flex" justifyContent="center" id="activeservicewindowid">
            <Masonry columns={{xs: 1, sm: 2, lg: 3}} spacing={2}>
                {services.map(serviceObject => (
                    <ServiceObject
                        key={serviceObject.serviceId}
                        serviceItem={serviceObject}
                    />
                ))}
            </Masonry>
        </Box>
        
    )
}

export default ActiveServicesWindow