import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LocalPizza,
  EmojiFoodBeverage,
  Cake,
  Restaurant,
  LocalBar,
} from '@mui/icons-material';
import { menuAPI } from '../services/api';
import { IPizza, IDrink, IDessert, ISideItem } from '../types';
import PizzaCard from '../components/menu/PizzaCard';
import DrinkCard from '../components/menu/DrinkCard';
import DessertCard from '../components/menu/DessertCard';
import SideItemCard from '../components/menu/SideItemCard';

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [drinks, setDrinks] = useState<IDrink[]>([]);
  const [desserts, setDesserts] = useState<IDessert[]>([]);
  const [sideItems, setSideItems] = useState<ISideItem[]>([]);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const [pizzasRes, drinksRes, dessertsRes, sidesRes] = await Promise.all([
        menuAPI.getPizzas(),
        menuAPI.getDrinks(),
        menuAPI.getDesserts(),
        menuAPI.getSideItems(),
      ]);

      setPizzas(pizzasRes.data.data);
      setDrinks(drinksRes.data.data);
      setDesserts(dessertsRes.data.data);
      setSideItems(sidesRes.data.data);
      setError(null);
    } catch (err) {
      setError('שגיאה בטעינת התפריט');
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: 'פיצות', icon: <LocalPizza /> },
    { label: 'משקאות', icon: <LocalBar /> },
    { label: 'תוספות', icon: <Restaurant /> },
    { label: 'קינוחים', icon: <Cake /> },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 4,
        }}
      >
        התפריט שלנו
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              fontWeight: 500,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mt: 4 }}>
        {activeTab === 0 && <PizzaCard pizzas={pizzas} />}
        {activeTab === 1 && <DrinkCard drinks={drinks} />}
        {activeTab === 2 && <SideItemCard sideItems={sideItems} />}
        {activeTab === 3 && <DessertCard desserts={desserts} />}
      </Box>
    </Container>
  );
};

export default MenuPage;