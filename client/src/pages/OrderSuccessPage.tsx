import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  CheckCircleOutline,
  LocalShipping,
  AccessTime,
} from '@mui/icons-material';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 6, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <CheckCircleOutline
          sx={{
            fontSize: 80,
            color: 'success.main',
            mb: 3,
          }}
        />
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main' }}>
          ההזמנה התקבלה בהצלחה!
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          תודה שהזמנת מ-GustaPizza
        </Typography>

        <Box sx={{ my: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <LocalShipping color="primary" />
            <Typography variant="h6">
              זמן משלוח משוער: 30-45 דקות
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <AccessTime color="primary" />
            <Typography variant="body1" color="text.secondary">
              תקבל SMS כשהשליח יוצא אליך
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 4 }}>
          מספר ההזמנה שלך: <strong>#ORD{Math.floor(Math.random() * 10000)}</strong>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/menu')}
          >
            הזמן עוד
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
          >
            חזור לדף הבית
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccessPage;