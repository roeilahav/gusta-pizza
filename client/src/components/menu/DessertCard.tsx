import { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Cake } from '@mui/icons-material';
import { DessertCardProps, IDessert } from '../../types';
import { useCart } from '../../contexts/CartContext';

const DessertCard = ({ desserts }: DessertCardProps) => {
  const { addDessert } = useCart();
  const [selectedDessert, setSelectedDessert] = useState<IDessert | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (dessert: IDessert) => {
    setSelectedDessert(dessert);
    setDialogOpen(true);
    setQuantity(1);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDessert(null);
  };

  const handleAddToCart = () => {
    if (selectedDessert) {
      addDessert(selectedDessert, quantity);
      handleCloseDialog();
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {desserts.map((dessert) => (
          <Grid key={dessert._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={dessert.image || '/dessert-placeholder.jpg'}
                alt={dessert.name}
                sx={{ objectFit: 'cover' }}
              />
              
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Cake color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {dessert.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {dessert.description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ₪{dessert.price}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog(dessert)}
                    disabled={!dessert.isAvailable}
                    sx={{
                      backgroundColor: 'secondary.main',
                      color: 'secondary.contrastText',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    {dessert.isAvailable ? 'הוסף' : 'אזל'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dessert selection dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        {selectedDessert && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Cake color="primary" />
                <Typography variant="h6">{selectedDessert.name}</Typography>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {selectedDessert.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ minWidth: '40px' }}
                >
                  -
                </Button>
                <Typography variant="h6" sx={{ mx: 2 }}>
                  {quantity}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ minWidth: '40px' }}
                >
                  +
                </Button>
              </Box>
            </DialogContent>
            
            <DialogActions>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2, pb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  סה"כ: ₪{selectedDessert.price * quantity}
                </Typography>
                <Box>
                  <Button onClick={handleCloseDialog}>ביטול</Button>
                  <Button 
                    variant="contained" 
                    onClick={handleAddToCart} 
                    sx={{ 
                      ml: 1,
                      backgroundColor: 'secondary.main',
                      color: 'secondary.contrastText',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    הוסף לעגלה
                  </Button>
                </Box>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default DessertCard;