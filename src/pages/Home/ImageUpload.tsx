import React, { useState } from "react";
import { Button, Input, LinearProgress } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage as firebaseStorage } from "../../FirebaseConfig"; // Importe o objeto 'storage' de seu arquivo de configuração do Firebase
import firebase from "firebase/app";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        setIsUploading(true);

        const storageRef = ref(firebaseStorage, selectedFile.name); // Use ref() para criar uma referência
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error uploading file:", error);
          },
          async () => {
            // Upload complete
            setIsUploading(false);
            setUploadProgress(0);
            console.log("File uploaded successfully!");

            // Se você precisar da URL de download do arquivo, você pode obtê-la assim:
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Download URL:", downloadURL);
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      {isUploading && (
        <div>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <p>{`Uploading... ${uploadProgress.toFixed(2)}%`}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
