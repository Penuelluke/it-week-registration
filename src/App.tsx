import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RegistrationForm } from './components/RegistrationForm';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RegistrationForm />
    </>
  );
}

export default App;