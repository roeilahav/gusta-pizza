import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  LocationOn,
  Payment,
  CheckCircle,
  LocalShipping,
  Store,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useSnackbar } from 'notistack';
import { DeliveryForm } from '../types';


const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  
  const [activeStep, setActiveStep] = useState(0);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit'>('cash');
  const [loading, setLoading] = useState(false);
  
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>({
    fullName: '',
    phone: '',
    street: '',
    houseNumber: '',
    city: 'באר שבע',
    floor: '',
    apartment: '',
    notes: '',
  });

  const steps = ['פרטי משלוח', 'אמצעי תשלום', 'אישור הזמנה'];

  const handleDeliveryChange = (field: keyof DeliveryForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryForm({ ...deliveryForm, [field]: event.target.value });
  };

  const validateDeliveryForm = () => {
    if (orderType === 'pickup') return true;
    
    const required = ['fullName', 'phone', 'street', 'houseNumber', 'city'];
    return required.every(field => deliveryForm[field as keyof DeliveryForm]);
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateDeliveryForm()) {
      enqueueSnackbar('נא למלא את כל השדות החובה', { variant: 'error' });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    // כאן תוסיף את הלוגיקה לשליחת ההזמנה לשרת
    // לדוגמה: await orderAPI.create({ ... })
    
    // סימולציה של שליחת הזמנה
    setTimeout(() => {
      clearCart();
      enqueueSnackbar('ההזמנה התקבלה בהצלחה!', { variant: 'success' });
      navigate('/order-success');
    }, 2000);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                סוג הזמנה
              </Typography>
              <RadioGroup
                value={orderType}
                onChange={(e) => setOrderType(e.target.value as 'delivery' | 'pickup')}
              >
                <FormControlLabel
                  value="delivery"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShipping />
                      משלוח עד הבית (₪15)
                    </Box>
                  }
                />
                <FormControlLabel
                  value="pickup"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Store />
                      איסוף עצמי
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {orderType === 'delivery' && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn />
                  כתובת למשלוח
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="שם מלא"
                      value={deliveryForm.fullName}
                      onChange={handleDeliveryChange('fullName')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="טלפון"
                      value={deliveryForm.phone}
                      onChange={handleDeliveryChange('phone')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <TextField
                      required
                      fullWidth
                      label="רחוב"
                      value={deliveryForm.street}
                      onChange={handleDeliveryChange('street')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      required
                      fullWidth
                      label="מספר בית"
                      value={deliveryForm.houseNumber}
                      onChange={handleDeliveryChange('houseNumber')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      required
                      fullWidth
                      label="עיר"
                      value={deliveryForm.city}
                      onChange={handleDeliveryChange('city')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="קומה"
                      value={deliveryForm.floor}
                      onChange={handleDeliveryChange('floor')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="דירה"
                      value={deliveryForm.apartment}
                      onChange={handleDeliveryChange('apartment')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12}}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="הערות למשלוח"
                      value={deliveryForm.notes}
                      onChange={handleDeliveryChange('notes')}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {orderType === 'pickup' && (
              <Alert severity="info">
                ניתן לאסוף את ההזמנה מהסניף ברחוב שמעוני, באר שבע
                <br />
                זמן הכנה משוער: 20-30 דקות
              </Alert>
            )}
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Payment />
              אמצעי תשלום
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'credit')}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="מזומן בעת קבלת המשלוח"
              />
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="כרטיס אשראי"
                disabled // נוסיף בהמשך
              />
            </RadioGroup>
            
            {paymentMethod === 'credit' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                תשלום בכרטיס אשראי יהיה זמין בקרוב
              </Alert>
            )}
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="success" />
              סיכום הזמנה
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>פריטים בהזמנה:</strong>
                </Typography>
                {items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {item.quantity} x {item.item.name}
                    </Typography>
                    <Typography variant="body2">
                      ₪{getItemPrice(item) * item.quantity}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>סכום ביניים:</Typography>
                  <Typography>₪{getTotalPrice()}</Typography>
                </Box>
                {orderType === 'delivery' && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>משלוח:</Typography>
                    <Typography>₪15</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">סה"כ לתשלום:</Typography>
                  <Typography variant="h6" color="primary">
                    ₪{getTotalPrice() + (orderType === 'delivery' ? 15 : 0)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {orderType === 'delivery' && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>כתובת למשלוח:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {deliveryForm.fullName}<br />
                    {deliveryForm.street} {deliveryForm.houseNumber}
                    {deliveryForm.apartment && `, דירה ${deliveryForm.apartment}`}
                    {deliveryForm.floor && `, קומה ${deliveryForm.floor}`}<br />
                    {deliveryForm.city}<br />
                    טלפון: {deliveryForm.phone}
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>אמצעי תשלום:</strong>
                </Typography>
                <Typography variant="body2">
                  {paymentMethod === 'cash' ? 'מזומן בעת קבלת המשלוח' : 'כרטיס אשראי'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          העגלה ריקה
        </Typography>
        <Button variant="contained" onClick={() => navigate('/menu')}>
          חזור לתפריט
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 6 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        השלמת הזמנה
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          חזור
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmitOrder}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} /> : 'אישור והזמנה'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            המשך
          </Button>
        )}
      </Box>
    </Container>
  );
};

// Helper function
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

export default CheckoutPage;