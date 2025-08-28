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
} from '@mui/material';
import { Add, Fastfood, SetMeal } from '@mui/icons-material';
import { ISideItem, SideItemCardProps } from '../../types';
import { useCart } from '../../contexts/CartContext';


const SideItemCard = ({ sideItems }: SideItemCardProps) => {
  const { addSideItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<ISideItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (item: ISideItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
    setQuantity(1);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addSideItem(selectedItem, quantity);
      handleCloseDialog();
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === 'salad' ? <SetMeal /> : <Fastfood />;
  };

  const getCategoryLabel = (category: string) => {
    return category === 'salad' ? 'סלט' : 'לחם';
  };

  const getCategoryColor = (category: string) => {
    return category === 'salad' ? 'success' : 'warning';
  };

  // Group items by category
  const groupedItems = sideItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ISideItem[]>);

  return (
    <>
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'primary.main',
            }}
          >
            {getCategoryIcon(category)}
            {category === 'salad' ? 'סלטים' : 'לחמים'}
          </Typography>
          
          <Grid container spacing={3}>
            {categoryItems.map((item) => (
              <Grid key={item._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <Chip
                    label={getCategoryLabel(item.category)}
                    color={getCategoryColor(item.category) as any}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 1,
                    }}
                  />
                  
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.image || '/side-placeholder.jpg'}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.description}
                    </Typography>
                    
                    {item.ingredients && item.ingredients.length > 0 && (
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                        רכיבים: {item.ingredients.join(', ')}
                      </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        ₪{item.price}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Add />}
                        onClick={() => handleOpenDialog(item)}
                        disabled={!item.isAvailable}
                      >
                        {item.isAvailable ? 'הוסף' : 'אזל'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Side item selection dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getCategoryIcon(selectedItem.category)}
                <Typography variant="h6">{selectedItem.name}</Typography>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {selectedItem.description}
              </Typography>
              
              {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    רכיבים:
                  </Typography>
                  <Typography variant="body2">
                    {selectedItem.ingredients.join(', ')}
                  </Typography>
                </Box>
              )}

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
                  סה"כ: ₪{selectedItem.price * quantity}
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

export default SideItemCard;