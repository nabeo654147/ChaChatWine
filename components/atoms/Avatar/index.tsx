import React, { VFC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

type AvatarProps = {
  src: string;
  size: number;
  shape?: 'circle' | 'square';
};

const Avatar: VFC<AvatarProps> = ({ ...props }) => {
  return <AvatarStyle {...props} src={props.src} width={props.size} height={props.size} />;
};

const AvatarStyle = styled(Image)<AvatarProps>`
  border-radius: ${(props) => (props.shape === 'square' ? undefined : 50)}%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

export default Avatar;
