import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  ArrowBack,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 100, color: 'text.secondary', mb: 3 }} />
        <Typography variant="h4" gutterBottom>
          העגלה שלך ריקה
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          הוסף פריטים מהתפריט כדי להתחיל
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/menu')}
          startIcon={<ArrowBack />}
        >
          חזור לתפריט
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        עגלת הקניות
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {items.map((cartItem) => (
            <Card key={cartItem.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {cartItem.item.name}
                    </Typography>
                    {cartItem.type === 'pizza' && cartItem.selectedToppings.length > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        תוספות: {cartItem.selectedToppings.map(t => t.name).join(', ')}
                      </Typography>
                    )}
                    {cartItem.type === 'drink' && cartItem.size && (
                      <Typography variant="body2" color="text.secondary">
                        גודל: {cartItem.size === 'glass' ? 'כוס' : 'בקבוק'}
                      </Typography>
                    )}
                  </Grid>
                  
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{cartItem.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  
                  <Grid size={{ xs: 4, sm: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      ₪{getItemPrice(cartItem) * cartItem.quantity}
                    </Typography>
                  </Grid>
                  
                  <Grid size={{ xs: 2, sm: 1 }}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(cartItem.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: 'sticky', top: 90 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                סיכום הזמנה
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ my: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>סכום ביניים:</Typography>
                  <Typography>₪{getTotalPrice()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>משלוח:</Typography>
                  <Typography>₪15</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    סה"כ לתשלום:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ₪{getTotalPrice() + 15}
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mb: 2 }}
                onClick={() => navigate('/checkout')}
              >
                המשך לתשלום
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/menu')}
              >
                המשך בקניות
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

// Helper function to calculate item price
const getItemPrice = (cartItem: any): number => {
  let price = 0;
  
  switch (cartItem.type) {
    case 'pizza':
      price = cartItem.item.price;
      price += cartItem.selectedToppings.reduce((sum: number, topping: any) => sum + topping.price, 0);
      break;
    case 'drink':
      if (cartItem.item.category === 'wine') {
        price = cartItem.size === 'bottle' ? cartItem.item.price.bottle : cartItem.item.price.glass;
      } else {
        price = cartItem.item.price;
      }
      break;
    default:
      price = cartItem.item.price;
  }
  
  return price;
};

export default CartPage;