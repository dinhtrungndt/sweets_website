import React, { useState,useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { encode, decode } from 'base-64';
import io from 'socket.io-client';
import { CreateDevice } from '../../../services/QRCode/QRCodeService';
import { getPostsAll } from '../../../services/pages/homeServices';
import { getDevice } from '../../../services/QRCode/QRCodeService';
import { useNavigate } from 'react-router-dom';
function QRCodeGenerator() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const socket = useRef(null);
  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };
  // Mã hóa dateTime thành Base64
  const encodedDateTime = encode(dateTime.toISOString());
// test lấy danh sách bài viết
  const OnGetPostsAll = async () => {
    const posts = await getPostsAll()
    console.log(posts);
  };
// test thêm device
  const OnCreateDevice = async () => {
    const device = await CreateDevice(encodedDateTime)
    console.log(device);
  };

  // test lấy danh sách device
  const OnGetDevice = async () => {
    const device = await getDevice()
    console.log(device);
  };
  useEffect(() => {
    socket.current = io('http://192.168.1.33:3001/');
    socket.current.on('connect', () => {
      console.log('Connected to server');
    });
    // OnCreateDevice()
    // OnGetDevice()
    socket.current.on('ChangeScreen', (data) => {
      navigate('/posts');
      console.log('ChangeScreen', data);
    });
    return () => {
      socket.current.disconnect();
    };
    
  }, []);

  
  

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
