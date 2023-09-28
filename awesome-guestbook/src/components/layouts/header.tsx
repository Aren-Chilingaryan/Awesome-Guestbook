import '../../styles/layout.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: '#EF5742' }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto' }}>
                        Application
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
