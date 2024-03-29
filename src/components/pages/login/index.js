import React, { useState,useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { encode, decode } from 'base-64';
import io from 'socket.io-client';
function QRCodeGenerator() {
  const [dateTime, setDateTime] = useState(new Date());
  const socket = useRef(null);
  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };
  useEffect(() => {
    socket.current = io('http://192.168.1.33:3001/');
    socket.current.on('connect', () => {
      console.log('Connected to server');
    });
    socket.current.on('ChangeScreen', (data) => {
      console.log('ChangeScreen', data);
    });
    return () => {
      socket.current.disconnect();
    };
    
  }, []);

  
  // Mã hóa dateTime thành Base64
  const encodedDateTime = encode(dateTime.toISOString());

  return (
    <div>
      <input type="datetime-local" value={dateTime.toISOString().slice(0, -8)} onChange={handleDateTimeChange} />
      {dateTime && (
        <div>
            <h3>{encodedDateTime}</h3>
          <QRCode value={encodedDateTime} />
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
