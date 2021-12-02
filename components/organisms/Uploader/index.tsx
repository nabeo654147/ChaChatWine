import React, { useCallback, FC, SetStateAction, Dispatch } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/dist/client/image';
import styled from 'styled-components';

type uploadProps = {
  src: string;
  setSrc: Dispatch<SetStateAction<string>>;
  myFiles: File[];
  setMyFiles: Dispatch<SetStateAction<File[]>>;
};

export const Uploader: FC<uploadProps> = ({ src, myFiles, setMyFiles, setSrc }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }, []);

  const onDropRejected = () => {
    alert('無効なファイルです。');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
  });

  const handlePreview = (files: any) => {
    const file = files[0];
    if (files === null || file === null) return;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
    };
  };

  return (
    <Outline>
      <UploadBox {...getRootProps()}>
        {/* この中をタップすれば画像を選択できる */}
        <input {...getInputProps()} />
        {myFiles.length === 0 ? (
          <p>画像を選択またはドラッグ＆ドロップできます</p>
        ) : (
          <div>
            {myFiles.map((file: File) => (
              <React.Fragment key={file.name}>
                {src && <Image src={src} width={500} height={600} layout={'intrinsic'} />}
              </React.Fragment>
            ))}
          </div>
        )}
      </UploadBox>
    </Outline>
  );
};

const Outline = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
`;

const UploadBox = styled.div`
  background-color: #c6dbff;
  border: 2px solid #6b7280;
  border-radius: 5px;
  p {
    padding: 1rem;
    text-align: center;
  }
`;
