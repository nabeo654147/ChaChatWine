import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { sp } from '../../../lib/media';

type Props = {
  ratingTitle?: string;
  starIds?: string[];
  favorite: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const StarRating: FC<Props> = ({ ratingTitle, starIds, favorite, onChange }) => {
  return (
    <RatingWrap>
      <label>{ratingTitle}</label>
      <div>
        {starIds?.map((starId) => {
          return (
            <React.Fragment key={starId}>
              <RatingInput
                type='radio'
                id={starId}
                name='rating'
                value={starId}
                checked={starId === favorite}
                onChange={onChange}
              />
              <RatingLabel htmlFor={starId} title={starId}>
                <StarIcon aria-hidden='true'></StarIcon>
                <HiddenVisually>{starId}</HiddenVisually>
              </RatingLabel>
            </React.Fragment>
          );
        })}
      </div>
    </RatingWrap>
  );
};

const RatingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  ${sp`
    flex-direction: column;
  `}
`;

const HiddenStyle = css`
  border: 0;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;
const HiddenVisually = styled.span`
  ${HiddenStyle}
`;

const RatingLabel = styled.label`
  cursor: pointer;
  color: gray;
  padding: 0 0.25rem;
`;

const RatingInput = styled.input`
  ${HiddenStyle}
  &:hover ~ ${RatingLabel} {
    color: lightgray;
  }
  &:checked ~ ${RatingLabel} {
    color: #ffbb00;
  }
`;

const StarIcon = styled.span`
  ::before {
    content: '★';
    font-size: 2rem;
  }
`;
