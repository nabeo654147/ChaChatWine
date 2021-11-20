import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  src?: string;
  size?: number | 'large' | 'small' | 'default';
  border?: boolean;
  shape?: 'circle' | 'square';
};

const AvatarStyle = styled.div<Props>`
  ${props => {
    if (!props.size) {
      return css`
        width: 40px;
        height: 40px;
        border-radius: 50%;
      `;
    } else {
      if (props.size === 'default') {
        return css`
          width: 40px;
          height: 40px;
          border-radius: 50%;
        `;
      } else if (props.size === 'small') {
        return css`
          width: 32px;
          height: 32px;
          border-radius: 50%;
        `;
      } else if (props.size === 'large') {
        return css`
          width: 64px;
          height: 64px;
          border-radius: 50%;
        `;
      } else {
        return css`
          width: ${props.size}px;
          height: ${props.size}px;
          border-radius: 50%;
        `;
      }
    }
  }}
  border: ${props => props.border && '1px solid blue'};
  background-color: gray;
  border-radius: ${props => props.shape === 'square' && '0%'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${props => props.src});
`;

const AtomAvatar: React.FC<Props> = ({ ...props }) => {
  return <AvatarStyle {...props} />;
};

export default AtomAvatar;
