// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';

import React, { useEffect, useRef } from "react";

function App() {
  let videoRef = useRef(null);

  let photoRef = useRef(null)

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePicture = () => {
    const width = 400
    const height = width / (16 / 9)
    
    let video = videoRef.current

    let photo = photoRef.current

    photo.width = width

    photo.height = height

    let ctx = photo.getContext('2d')

    ctx.drawImage(video, 0, 0, width, height)
    
  }

  const clearImage = () => {
    let photo = photoRef.current

    let ctx = photo.getContext('2d')

    ctx.clearRect(0,0,photo.width,photo.height)
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="container">
      <h1 className="text-center"><center>Camera Selfie App in React</center></h1>

      <video ref={videoRef} className="container"></video>
      {/* <br></br> */}
      <button onClick={takePicture} className="btn-1">Take Picture</button>

      <canvas className="container" ref={photoRef}></canvas>

      <button onClick={clearImage} className="btn-2">Clear Image</button>

      <br/><br/>
    </div>
  );
}

export default App;