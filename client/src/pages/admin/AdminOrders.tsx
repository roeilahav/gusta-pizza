import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Visibility,
  Edit,
  LocalShipping,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: 'יוסי כהן',
      phone: '050-1234567',
      items: 'מרגריטה L, קוקה קולה',
      total: 125,
      status: 'pending',
      time: '10:30',
      type: 'delivery',
      address: 'רחוב הרצל 15, באר שבע',
    },
    {
      id: 'ORD002',
      customer: 'מיכל לוי',
      phone: '052-9876543',
      items: 'פיצה משפחתית, סלט קיסר',
      total: 189,
      status: 'preparing',
      time: '10:25',
      type: 'pickup',
      address: '',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'primary';
      case 'out-for-delivery': return 'secondary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'ממתין';
      case 'preparing': return 'בהכנה';
      case 'ready': return 'מוכן';
      case 'out-for-delivery': return 'בדרך';
      case 'delivered': return 'נמסר';
      case 'cancelled': return 'בוטל';
      default: return status;
    }
  };

  const handleStatusChange = () => {
    if (selectedOrder && newStatus) {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      ));
      setStatusChangeOpen(false);
      setNewStatus('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        ניהול הזמנות
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מספר הזמנה</TableCell>
              <TableCell>לקוח</TableCell>
              <TableCell>פריטים</TableCell>
              <TableCell>סה"כ</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>סוג</TableCell>
              <TableCell>שעה</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{order.customer}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.phone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>₪{order.total}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(order.status)}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.type === 'delivery' ? 'משלוח' : 'איסוף'}
                    variant="outlined"
                    size="small"
                    icon={order.type === 'delivery' ? <LocalShipping /> : undefined}
                  />
                </TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedOrder(order);
                      setDialogOpen(true);
                    }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewStatus(order.status);
                      setStatusChangeOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>פרטי הזמנה {selectedOrder.id}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">לקוח:</Typography>
                <Typography>{selectedOrder.customer} - {selectedOrder.phone}</Typography>
              </Box>
              {selectedOrder.type === 'delivery' && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">כתובת:</Typography>
                  <Typography>{selectedOrder.address}</Typography>
                </Box>
              )}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">פריטים:</Typography>
                <Typography>{selectedOrder.items}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">סה"כ:</Typography>
                <Typography variant="h6">₪{selectedOrder.total}</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>סגור</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusChangeOpen} onClose={() => setStatusChangeOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>שנה סטטוס הזמנה</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>סטטוס חדש</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="סטטוס חדש"
            >
              <MenuItem value="pending">ממתין</MenuItem>
              <MenuItem value="preparing">בהכנה</MenuItem>
              <MenuItem value="ready">מוכן</MenuItem>
              <MenuItem value="out-for-delivery">בדרך</MenuItem>
              <MenuItem value="delivered">נמסר</MenuItem>
              <MenuItem value="cancelled">בוטל</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusChangeOpen(false)}>ביטול</Button>
          <Button onClick={handleStatusChange} variant="contained">שמור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOrders;