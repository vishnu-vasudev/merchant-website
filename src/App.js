import { useEffect, useState } from "react";
import "./App.css";

import Compressor from "compressorjs";
import imageCompression from "browser-image-compression";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState();
  const [file, setFile] = useState()

  // const [preview, setPreview] = useState<string>();

  // useEffect(() => {
  //   if(formData1) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //     }
  //     reader.readAsDataURL(formData1)
  //   }

  // }, [formData1]);

  const handleChange = async (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
    const imageFile = e.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 4,
      // alwaysKeepResolution: true,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      setFormData(URL.createObjectURL(compressedFile))

      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input id="file" type="file" accept="image/*" onChange={handleChange} />
      <br />
      <img alt="file" src={formData} />
      <img height={800} alt="file" src={file} />
    </div>
  );
}

export default App;
