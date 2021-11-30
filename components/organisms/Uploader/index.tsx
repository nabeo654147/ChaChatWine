import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { TaskState } from 'firebase/storage';
import React, { useState, useCallback, FC } from 'react';
import styled from 'styled-components';
import { storage } from '../../../lib/firebase';
import { useDropzone } from 'react-dropzone';
import Image from 'next/dist/client/image';

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: TaskState;
};

const Upload: FC = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [clickable, setClickable] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
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

  const handleUpload = (acceptedImg: any) => {
    try {
      const storageRef = ref(storage, `imgaes/${myFiles[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, myFiles[0]);

      uploadTask.on(
        'state_changed',
        (snapshot: firebaseOnLoadProp) => {
          const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error: any) => {
          //失敗した場合
          switch (error.code) {
            case 'storage/unauthorized':
              console.error('権限がありません');
              break;
            case 'storage/canceled':
              console.error('アップロードがキャンセルされました');
              break;
            case 'storage/unknown':
              console.error('予期せぬエラーが発生しました');
              break;
          }
        },
        () => {
          //成功した時
          try {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
              console.log(`ダウンロードしたURL ${downloadUrl}`);
            });
          } catch (error: any) {
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('ファイルが存在しませんでした');
                break;
              case 'storage/unauthorized':
                console.log('権限がありません');
                break;
              case 'storage/canceled':
                console.log('キャンセルされました');
                break;
              case 'storage/unknown':
                console.log('予期せぬエラーが生じました');
                break;
            }
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

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
          <GuideText>画像を選択またはドラッグ＆ドロップできます</GuideText>
        ) : (
          <div>
            {myFiles.map((file: File) => (
              <React.Fragment key={file.name}>
                {src && <Image src={src} width={350} height={400} />}
              </React.Fragment>
            ))}
          </div>
        )}
      </UploadBox>
      <UploadButton disabled={!clickable} type='submit' onClick={() => handleUpload(myFiles)}>
        UPLOAD
      </UploadButton>
    </Outline>
  );
};

export default Upload;

const Outline = styled.div`
  width: 80%;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* text-align: center; */
  border-radius: 5px;
`;

const UploadBox = styled.div`
  /* height: 50vh; */
  background-color: #c6dbff;
  border: 2px solid #6b7280;
  border-radius: 5px;
`;

const GuideText = styled.p`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  border-radius: 5px;
`;
