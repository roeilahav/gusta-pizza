import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  WhatsApp,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#7C2D12',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              GustaPizza
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              הפיצה הטובה ביותר בבאר שבע
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              מאז 2020, אנחנו מכינים את הפיצות הטעימות ביותר עם החומרים הטריים ביותר
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              צור קשר
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body1">052-391-8447</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body1">052-444-8086</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body1">info@gustapizza.co.il</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body1">רחוב שמעוני, באר שבע</Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              עקבו אחרינו
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{ 
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                  }
                }}
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ 
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                  }
                }}
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{ 
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.1)',
                  }
                }}
                href="https://wa.me/972523918447"
                target="_blank"
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 3 }}>
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} GustaPizza. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;