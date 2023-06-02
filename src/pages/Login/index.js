import LoginOrRegister from '../../components/LoginOrRegister'
import './style.css'
import { Box, Button, Checkbox, Container, FormControlLabel, TextField } from "@mui/material"
import { useNavigate } from 'react-router'

const Login = () => {

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get("email"),
          password: data.get("password"),
        });
        navigate("/lists")
      };

    return (
        <div className="logincontainer">
            <LoginOrRegister
                title="Login"
                altButtonTitle="Need an account?"
                altButtonLink="/register"
                altButtonText="Register"
            >
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </LoginOrRegister>
        </div>
    )
}

export default Login