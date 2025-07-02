import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8em', color: '#6C7086' }}>
      <p>Harmish Patel's Portfolio</p>
      {/* <p>&copy; {new Date().getFullYear()} Harmish Patel. All rights reserved.</p> */}
      <p>Visitor Count: [Coming Soon]</p>
    </div>
  );
};

export default Footer; 