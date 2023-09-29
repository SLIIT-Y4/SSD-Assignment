import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import check from "./check.png";
import styles from "./styles.module.css";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = () => {
    // Validation and sanitization checks
    if (!value) {
      alert("Please select a file to upload.");
      return;
    }

    // Perform file type validation
    const allowedFileTypes = [
      "application/msword", // for docx
      "application/pdf", // for pdf
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // for pptx
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for xlsx
    ];

    if (!allowedFileTypes.includes(value.type)) {
      alert("Invalid file type. Please upload an document, pdf, presentation or excel sheet file.");
      return;
    }

    // Restrict file size (e.g., 20 MB)
    const maxSize = 20 * 1024 * 1024; // 20 MB in bytes
    if (value.size > maxSize) {
      alert("File size exceeds the maximum allowed size (20MB).");
      return;
    }

    // Sanitize file name
    const fileName = sanitizeFileName(new Date().getTime() + value.name);

    //we will upload logic here
    setProgressShow(true);
    //const fileName = new Date().getTime() + value.name;

    const storageRef = ref(
      storage,
      type === "submission"
        ? `/submission/${fileName}`
        : `/templates/${fileName}`
    );

    const uploadTask = uploadBytesResumable(storageRef, value);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleInputState(name, url);
        });
      }
    );
  };

  const sanitizeFileName = (fileName) => {
    // Remove spaces and special characters from the file name
    return fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
        value={""}
        className={styles.input}
        {...rest}
      />

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className={styles.button}
      >
        {label}
      </button>

      {type === "image" && value && (
        <img
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          alt="file"
          className={styles.preview_img}
        />
      )}
      {type === "submission" && value && (
        <audio
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          // controls
        />
      )}

      {value !== null && !progressShow && typeof value !== "string" && (
        <button onClick={handleUpload} className={styles.button}>
          Upload
        </button>
      )}
      {progressShow && progress < 100 && (
        <div className={styles.progress_container}>
          <p>{progress}%</p>
        </div>
      )}
      {progress === 100 && (
        <div className={styles.progress_container}>
          <img src={check} alt="check circle" className={styles.check_img} />
        </div>
      )}
    </div>
  );
};

export default FileInput;
