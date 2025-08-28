import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  LocalPizza,
  PendingActions,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { Line } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todayOrders: 45,
    todayRevenue: 3250,
    activeUsers: 1234,
    pendingOrders: 5,
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: 'יוסי כהן', total: 125, status: 'pending', time: '10:30' },
    { id: 2, customer: 'מיכל לוי', total: 89, status: 'preparing', time: '10:25' },
    { id: 3, customer: 'דני אברהם', total: 156, status: 'delivered', time: '10:15' },
    { id: 4, customer: 'שרה ישראלי', total: 98, status: 'ready', time: '10:10' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'primary';
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
      case 'delivered': return 'נמסר';
      case 'cancelled': return 'בוטל';
      default: return status;
    }
  };

  const statCards = [
    {
      title: 'הזמנות היום',
      value: stats.todayOrders,
      icon: <ShoppingCart />,
      color: '#DC2626',
      change: '+12%',
    },
    {
      title: 'הכנסות היום',
      value: `₪${stats.todayRevenue}`,
      icon: <AttachMoney />,
      color: '#059669',
      change: '+8%',
    },
    {
      title: 'משתמשים פעילים',
      value: stats.activeUsers,
      icon: <People />,
      color: '#3B82F6',
      change: '+5%',
    },
    {
      title: 'הזמנות ממתינות',
      value: stats.pendingOrders,
      icon: <PendingActions />,
      color: '#F59E0B',
      change: '0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        לוח בקרה
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid size={{ xs: 12, md: 3, sm: 6}} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: stat.change.startsWith('+') ? 'success.main' : 'text.secondary',
                        mt: 1,
                      }}
                    >
                      {stat.change} מאתמול
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              הזמנות אחרונות
            </Typography>
            <List>
              {recentOrders.map((order) => (
                <ListItem
                  key={order.id}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <LocalPizza />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={order.customer}
                    secondary={`${order.time} • ₪${order.total}`}
                  />
                  <Chip
                    label={getStatusText(order.status)}
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Popular Items */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              מוצרים פופולריים היום
            </Typography>
            <List>
              {[
                { name: 'מרגריטה', count: 23, trend: 'up' },
                { name: 'פיצה משפחתית XL', count: 18, trend: 'up' },
                { name: 'קוקה קולה 1.5 ליטר', count: 15, trend: 'same' },
                { name: 'סלט קיסר', count: 12, trend: 'down' },
                { name: 'טירמיסו', count: 10, trend: 'up' },
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.count} הזמנות`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.trend === 'up' && <TrendingUp color="success" />}
                    {item.trend === 'down' && <TrendingUp color="error" sx={{ transform: 'rotate(180deg)' }} />}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;