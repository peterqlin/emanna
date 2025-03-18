'use client';

import React, { useEffect, useState } from 'react';
import Flow from './components/Flow';

const HomePage: React.FC = () => {
  const [message, setMessage] = useState('aaaaaaaaaaa emssage');

  useEffect(() => {
    fetch('http://localhost:8000/api/py/mostRecentEmail')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        console.log('setting data to:', data.Subject);
        setMessage(data.Subject);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>message: {message}</h1>
      <Flow />
    </div>
  );
};

export default HomePage;