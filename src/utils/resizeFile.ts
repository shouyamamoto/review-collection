import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob, maxWidth: number, maxHeight: number) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
