import React, { useState } from 'react';
import { pizzaAPI, toppingAPI, drinkAPI } from '../services/api';

const TestConnection: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testPizzas = async () => {
    setLoading(true);
    try {
      const response = await pizzaAPI.getAllPizzas();
      setResult(`✅ Pizzas: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }
    setLoading(false);
  };

  const testToppings = async () => {
    setLoading(true);
    try {
      const response = await toppingAPI.getAllToppings();
      setResult(`✅ Toppings: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }
    setLoading(false);
  };

  const testDrinks = async () => {
    setLoading(true);
    try {
      const response = await drinkAPI.getAllDrinks();
      setResult(`✅ Drinks: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧪 API Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testPizzas} disabled={loading}>
          Test Pizzas API
        </button>
        <button onClick={testToppings} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Toppings API
        </button>
        <button onClick={testDrinks} disabled={loading} style={{ marginLeft: '10px' }}>
          Test Drinks API
        </button>
      </div>

      {loading && <p>Loading...</p>}
      
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        borderRadius: '5px',
        fontSize: '12px',
        overflow: 'auto',
        maxHeight: '400px'
      }}>
        {result}
      </pre>
    </div>
  );
};

export default TestConnection;