import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { encode } from "base-64";
import io from "socket.io-client";
import { CreateDevice,UpdateDevice } from "../../../services/QRCode/QRCodeService";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";
function QRCodeGenerator() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const socket = useRef(null);
  const onCreateDeviceCalled = useRef(false);

  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };

  const encodedDateTime = encode(dateTime.toISOString());

  useEffect(() => {
    socket.current = io("http://192.168.1.68:3001/");
    socket.current.on("connect", () => {
      console.log("Connected to server");
    });
    socket.current.on('send_device_iduser2', (data) => {
      console.log('>>>>>>>>>> data.iduser : ', data.iduser);
      console.log('>>>>>>>>>> data.deviceid : ', data.deviceid);
      console.log('>>>>>>>>>> encodedDateTime : ', encodedDateTime);
      if (data.deviceid !== encodedDateTime) {
        return;
      }
      const CheckDeviceUpdate = async () => {
        const response = await UpdateDevice(data.iduser,data.deviceid);
        // console.log('>>>>>>>>>> response : ', response);
        if (response.status) {
          console.log('đăng nhập thành công');
          navigate('/posts');
          alert('Đăng nhập thành công');
        }
      }
      CheckDeviceUpdate();
    });
    if (!onCreateDeviceCalled.current) {
      OnCreateDevice();
      onCreateDeviceCalled.current = true;
    }

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const OnCreateDevice = async () => {
    const device = await CreateDevice(encodedDateTime);
    console.log(device);
  };
  const CheckDeviceUpdate = async (iduser,deviceid) => {
    const response = await UpdateDevice(iduser,deviceid);
    // console.log('>>>>>>>>>> response : ', response);
    if (response.status) {
      console.log('đăng nhập thành công');
    }
    return response;
  }

  return (
    <div>
      <input
        type="datetime-local"
        value={dateTime.toISOString().slice(0, -8)}
        onChange={handleDateTimeChange}
      />
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
