import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
      onClose && onClose(); // Appeler une fonction de fermeture si elle est fournie
    }, duration);

    return () => clearTimeout(timeoutId); // Nettoyer le timeout en cas de démontage du composant
  }, [duration, onClose]);

  return (
    <div style={{ display: visible ? 'block' : 'none', position: 'fixed', top: 10, right: 10, padding: 10, background: '#fff', border: '1px solid #ccc', borderRadius: 4 }}>
      {message}
    </div>
  );
};

export const showPopup = (message: string, duration?: number, onClose?: () => void) => {
  const popup = document.createElement('div');
  document.body.appendChild(popup);

  const closePopup = () => {
    document.body.removeChild(popup);
    onClose && onClose();
  };

  const element = (
    <Popup message={message} duration={duration} onClose={closePopup} />
  );

  ReactDOM.render(element, popup);
};