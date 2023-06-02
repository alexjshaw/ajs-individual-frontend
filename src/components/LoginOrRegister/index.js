import { Container, Box, Typography, Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const LoginOrRegister = ({
    title,
    altButtonTitle,
    altButtonLink,
    altButtonText,
    children
}) => {
    return (
        <Container maxWidth={false} sx={{maxWidth: "600px", borderRadius:3, p:"24px", bgcolor:"white"}}>
            <Box className="homelogo" display="flex" justifyContent="center">
                <img src="/main-logo.svg" alt="Main Logo" className="mainlogo"/>
                <Typography variant="h3" justifySelf="center">
                    Telegram Connect
                </Typography>
            </Box>
            <Typography variant="h4" sx={{mb:"24px"}} >
                {title}
            </Typography>
            {children}
            <Box className="loginregisterswap">
                <Typography variant="body1" sx={{mb:"24px"}}>
                    {altButtonTitle}
                </Typography>
                <NavLink to={altButtonLink}>
                    <Button variant="contained">
                        {altButtonText}
                    </Button>
                </NavLink>

            </Box>
        </Container>
    )
}

export default LoginOrRegister