import React from 'react';

const Button = ({ label, onClick }) => {
   return <button style={{width: '300px'}} onClick={onClick}>{label}</button>;
};

export default Button;