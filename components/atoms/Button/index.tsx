import React, { CSSProperties, FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  text?: string;
  style?: CSSProperties;
  disable?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'default' | 'large';
  /**
   * 形を変更できます。
   */
  shape?: 'default' | 'circle' | 'round' | 'iconCircle';
  /**
   * 親要素いっぱい広げます。
   */
  block?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void | Promise<void>;
};

export const Button: FC<Props> = ({
  text,
  style,
  disable,
  icon,
  type = 'button',
  size = 'default',
  shape = 'default',
  block = false,
  // loading = false,
  onClick,
}: Props) => {
  return (
    <ButtonStyle
      type={type}
      size={size}
      shape={shape}
      block={block}
      // loading={loading}
      style={style}
      disabled={disable}
      onClick={onClick}
    >
      {icon ? <IconStyle>{icon}</IconStyle> : null}
      {shape === 'iconCircle' ? <span>{(text = '')}</span> : undefined}
      {text}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Props>`
  //デフォルトのスタイル
  background-color: transparent;
  /* border: none; */
  cursor: pointer;
  outline: none;
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #1890ff;
  height: 32px;
  padding: 5px 16px;
  font-size: 14px;
  border-radius: 3px;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
    top: -3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.2s;
    border: double 1px inherit;
  }
  .ButtonIcon {
    display: flex;
    justify-content: center;
  }
  //サイズのスタイル
  ${(props) => {
    if (props.size === 'small') {
      return css`
        height: 24px;
        padding: 2px 7px;
        font-size: 12px;
      `;
    } else if (props.size === 'large') {
      return css`
        height: 40px;
        padding: 6.4px 18px;
        font-size: 16px;
      `;
    } else {
      return undefined;
    }
  }}
  //形状のスタイル
  ${(props) => {
    if (props.shape === 'iconCircle') {
      if (props.size === 'small') {
        return css`
          border-radius: 50%;
          width: 1.8em;
          height: 1.8em;
          padding: 0;
        `;
      } else if (props.size === 'large') {
        return css`
          font-size: 20px;
          border-radius: 50%;
          width: 2.8em;
          height: 2.8em;
          padding: 0;
        `;
      } else {
        return css`
          border-radius: 50%;
          width: 2.5em;
          height: 2.5em;
          padding: 0;
        `;
      }
    } else if (props.shape === 'circle') {
      return css`
        min-width: 30px;
        min-height: 30px;
        border-radius: 50%;
      `;
    } else if (props.shape === 'round') {
      return css`
        padding: 6.4px 20px;
        border-radius: 40px;
      `;
    } else {
      return undefined;
    }
  }}
  //ボタンを押せなくするスタイル
  ${(props) =>
    (props.disabled || props.loading) &&
    css`
      opacity: 0.8;
      pointer-events: none;
      &:active {
        opacity: 0.8;
        box-shadow: unset;
      }
    `}
  //ブロックのスタイル
  ${(props) =>
    props.block &&
    css`
      width: 100%;
    `}
`;

const IconStyle = styled.span`
  display: flex;
  justify-content: center;
`;
