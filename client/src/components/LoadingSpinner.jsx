import React from 'react';
import '../style/loading-spinner.scss';  // Create this file for custom styles

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
