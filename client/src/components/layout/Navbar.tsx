import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  LocalPizza,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalItems } = useCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'בית', path: '/' },
    { text: 'תפריט', path: '/menu' },
    { text: 'אודות', path: '/about' },
    { text: 'צור קשר', path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          my: 2, 
          fontWeight: 'bold', 
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <LocalPizza />
        GustaPizza
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flexGrow: 1,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              <LocalPizza sx={{ fontSize: 32 }} />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                GustaPizza
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, mx: 4 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{ 
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <Badge 
                badgeContent={getTotalItems()} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#FCD34D',
                    color: '#7C2D12',
                    fontWeight: 'bold',
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;