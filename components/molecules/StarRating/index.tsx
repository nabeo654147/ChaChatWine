import React, { VFC } from "react";
import styled, { css } from "styled-components";

type RatingInputProps = {
  type?: string,
  id?: string,
  name?: string,
  value?: string,
  htlmFor?: string,
  title?: string,
  ariaHidden?: boolean,
  ratingTitle?: string,
  starIds?: string[]
}

export const StarRating:VFC<RatingInputProps> = ({ 
  ratingTitle,
  starIds = ['5star','4star','3star','2star','1star',]
 }) => {
  return (
    <RatingWrap>
    <label>{ratingTitle}</label>
    <Rating>
      {starIds.map((starId) => {
        return (
          <React.Fragment key={starId}>
            <RatingInput 
              type="radio"
              id={starId}
              name="rating"
              value={starId} 
            />
              <RatingLabel 
                htmlFor={starId}
                title={starId}
              >
                <RatingIcon aria-hidden="true">
                </RatingIcon>
              <HiddenVisually>{starId}</HiddenVisually>
            </RatingLabel>
          </React.Fragment>
        )
      })}
    </Rating>

    </RatingWrap>
  )
};

const RatingWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const Rating = styled.div`
  /* display: inline-flex;
  flex-direction: row-reverse; */
`

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
`
const HiddenVisually = styled.span`
  ${HiddenStyle}
`

const RatingLabel = styled.label`
  cursor: pointer;
  color: gray;
  padding: 0 0.25rem;
`

const RatingInput = styled.input`
  ${HiddenStyle}
  &:hover ~ ${RatingLabel} {
    color: lightgray;
  }
  &:checked ~ ${RatingLabel} {
    color: #ffbb00;
  }
`

const RatingIcon = styled.span`
  ::before {
    content: "★";
    font-size: 2rem;
  }
`
