import { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { Add, LocalPizza } from '@mui/icons-material';
import { IPizza, ITopping, PizzaCardProps } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { menuAPI } from '../../services/api';


const PizzaCard = ({ pizzas }: PizzaCardProps) => {
  const { addPizza } = useCart();
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);
  const [toppings, setToppings] = useState<ITopping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<ITopping[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = async (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setDialogOpen(true);
    setQuantity(1);
    setSelectedToppings([]);
    setSpecialInstructions('');
    
    // Fetch toppings if not already loaded
    if (toppings.length === 0) {
      try {
        const response = await menuAPI.getToppings();
        setToppings(response.data.data);
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPizza(null);
  };

  const handleToppingToggle = (topping: ITopping) => {
    const isSelected = selectedToppings.find(t => t._id === topping._id);
    if (isSelected) {
      setSelectedToppings(selectedToppings.filter(t => t._id !== topping._id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    if (selectedPizza) {
      addPizza(selectedPizza, selectedToppings, quantity, specialInstructions);
      handleCloseDialog();
    }
  };

  const getTotalPrice = () => {
    if (!selectedPizza) return 0;
    const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    return (selectedPizza.price + toppingsPrice) * quantity;
  };

  return (
    <>
      <Grid container spacing={3}>
        {pizzas.map((pizza) => (
          <Grid key={pizza._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {pizza.isSpecial && (
                <Chip
                  label="מיוחדת"
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                    fontWeight: 'bold',
                  }}
                />
              )}
              
              <CardMedia
                component="img"
                height="200"
                image={pizza.image || '/pizza-placeholder.jpg'}
                alt={pizza.name}
                sx={{ objectFit: 'cover' }}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {pizza.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pizza.description}
                </Typography>
                
                {pizza.isVegan && (
                  <Chip
                    label="טבעונית"
                    color="success"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ₪{pizza.price}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog(pizza)}
                    disabled={!pizza.isAvailable}
                  >
                    {pizza.isAvailable ? 'הוסף לעגלה' : 'אזל מהמלאי'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pizza customization dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedPizza && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalPizza color="primary" />
                <Typography variant="h6">{selectedPizza.name}</Typography>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                בחר תוספות:
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {['6', '10', '12'].map((category) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      תוספות ב-₪{category}:
                    </Typography>
                    <FormGroup>
                      {toppings
                        .filter(t => t.category === category)
                        .map((topping) => (
                          <FormControlLabel
                            key={topping._id}
                            control={
                              <Checkbox
                                checked={selectedToppings.some(t => t._id === topping._id)}
                                onChange={() => handleToppingToggle(topping)}
                              />
                            }
                            label={`${topping.name} (+₪${topping.price})`}
                          />
                        ))}
                    </FormGroup>
                  </Box>
                ))}
              </Box>

              <TextField
                fullWidth
                label="הערות מיוחדות"
                multiline
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>כמות:</Typography>
                <Button
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <Typography>{quantity}</Typography>
                <Button
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </Box>
            </DialogContent>
            
            <DialogActions>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2, pb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  סה"כ: ₪{getTotalPrice()}
                </Typography>
                <Box>
                  <Button onClick={handleCloseDialog} sx={{ mr: 1 }}>
                    ביטול
                  </Button>
                  <Button variant="contained" onClick={handleAddToCart}>
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

export default PizzaCard;