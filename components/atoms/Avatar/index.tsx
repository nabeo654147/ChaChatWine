import React, { VFC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

type AvatarProps = {
  src: string;
  size: number;
  alt?: string;
  shape?: 'circle' | 'square';
};

const Avatar: VFC<AvatarProps> = ({ src, size, alt, shape }) => {
  return <AvatarStyle src={src} alt={alt} width={size} height={size} size={size} />;
};

const AvatarStyle = styled(Image)<AvatarProps>`
  border-radius: ${({ shape }) => (shape === 'square' ? undefined : 50)}%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export default Avatar;
