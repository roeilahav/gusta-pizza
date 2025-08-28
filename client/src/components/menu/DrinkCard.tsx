import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Add, LocalBar, WineBar, EmojiFoodBeverage } from '@mui/icons-material';
import { DrinkCardProps, IDrink, IWineDrink } from '../../types';
import { useCart } from '../../contexts/CartContext';


const DrinkCard = ({ drinks }: DrinkCardProps) => {
  const { addDrink } = useCart();
  const [selectedDrink, setSelectedDrink] = useState<IDrink | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wineSize, setWineSize] = useState<'glass' | 'bottle'>('glass');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (drink: IDrink) => {
    setSelectedDrink(drink);
    setDialogOpen(true);
    setQuantity(1);
    setWineSize('glass');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDrink(null);
  };

  const handleAddToCart = () => {
    if (selectedDrink) {
      if (selectedDrink.category === 'wine') {
        addDrink(selectedDrink, quantity, wineSize);
      } else {
        addDrink(selectedDrink, quantity);
      }
      handleCloseDialog();
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'soft':
        return <EmojiFoodBeverage />;
      case 'beer':
        return <LocalBar />;
      case 'wine':
        return <WineBar />;
      default:
        return <LocalBar />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'soft':
        return 'משקה קל';
      case 'beer':
        return 'בירה';
      case 'wine':
        return 'יין';
      default:
        return '';
    }
  };

  const getPrice = (drink: IDrink): string => {
    if (drink.category === 'wine') {
      const wine = drink as IWineDrink;
      return `כוס: ₪${wine.price.glass} | בקבוק: ₪${wine.price.bottle}`;
    }
    return `₪${(drink as any).price}`;
  };

  const getTotalPrice = (): number => {
    if (!selectedDrink) return 0;
    let price = 0;
    
    if (selectedDrink.category === 'wine') {
      const wine = selectedDrink as IWineDrink;
      price = wineSize === 'glass' ? wine.price.glass : wine.price.bottle;
    } else {
      price = (selectedDrink as any).price;
    }
    
    return price * quantity;
  };

  // Group drinks by category
  const groupedDrinks = drinks.reduce((acc, drink) => {
    if (!acc[drink.category]) {
      acc[drink.category] = [];
    }
    acc[drink.category].push(drink);
    return acc;
  }, {} as Record<string, IDrink[]>);

  return (
    <>
      {Object.entries(groupedDrinks).map(([category, categoryDrinks]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            {getIcon(category)}
            {getCategoryLabel(category)}
          </Typography>
          
          <Grid container spacing={3}>
            {categoryDrinks.map((drink) => (
              <Grid key={drink._id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {drink.name}
                    </Typography>
                    
                    {drink.category === 'wine' && (
                      <>
                        {(drink as IWineDrink).winery && (
                          <Typography variant="body2" color="text.secondary">
                            יקב: {(drink as IWineDrink).winery}
                          </Typography>
                        )}
                        {(drink as IWineDrink).origin && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            מקור: {(drink as IWineDrink).origin}
                          </Typography>
                        )}
                      </>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {getPrice(drink)}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Add />}
                        onClick={() => handleOpenDialog(drink)}
                        disabled={!drink.isAvailable}
                      >
                        הוסף
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Drink selection dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        {selectedDrink && (
          <>
            <DialogTitle>{selectedDrink.name}</DialogTitle>
            
            <DialogContent>
              {selectedDrink.category === 'wine' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    בחר גודל:
                  </Typography>
                  <RadioGroup
                    value={wineSize}
                    onChange={(e) => setWineSize(e.target.value as 'glass' | 'bottle')}
                  >
                    <FormControlLabel
                      value="glass"
                      control={<Radio />}
                      label={`כוס - ₪${(selectedDrink as IWineDrink).price.glass}`}
                    />
                    <FormControlLabel
                      value="bottle"
                      control={<Radio />}
                      label={`בקבוק - ₪${(selectedDrink as IWineDrink).price.bottle}`}
                    />
                  </RadioGroup>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>כמות:</Typography>
                <Button size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <Typography>{quantity}</Typography>
                <Button size="small" onClick={() => setQuantity(quantity + 1)}>
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
                  <Button onClick={handleCloseDialog}>ביטול</Button>
                  <Button variant="contained" onClick={handleAddToCart} sx={{ ml: 1 }}>
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

export default DrinkCard;