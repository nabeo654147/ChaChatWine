import { VFC } from "react";
import styled, { css } from "styled-components";

type RatingInputProps = {
  type?: string,
  id?: string,
  name?: string,
  value?: string,
  htlmFor?: string,
  title?: string,
  ariaHidden?: boolean
}

export const StarRating:VFC<RatingInputProps> = () => {
  return (
    <>
    <label>お気に入り度 :
    <Rating>
      <RatingInput type="radio" id="5star" name="rating" value="5" required />
        <RatingLabel htmlFor="5star" title="星5つ"><RatingIcon aria-hidden="true"></RatingIcon>
          <HiddenVisually>星5つ</HiddenVisually>
        </RatingLabel>
      <RatingInput type="radio" id="4star" name="rating" value="4" />
        <RatingLabel htmlFor="4star" title="星4つ"><RatingIcon aria-hidden="true"></RatingIcon>
          <HiddenVisually>星4つ</HiddenVisually>
        </RatingLabel>
      <RatingInput type="radio" id="3star" name="rating" value="3" />
        <RatingLabel htmlFor="3star" title="星3つ"><RatingIcon aria-hidden="true"></RatingIcon>
          <HiddenVisually>星3つ</HiddenVisually>
        </RatingLabel>
      <RatingInput type="radio" id="2star" name="rating" value="2" />
        <RatingLabel htmlFor="2star" title="星2つ"><RatingIcon aria-hidden="true"></RatingIcon>
          <HiddenVisually>星2つ</HiddenVisually>
        </RatingLabel>
      <RatingInput type="radio" id="1star" name="rating" value="1" />
        <RatingLabel htmlFor="1star" title="星1つ"><RatingIcon aria-hidden="true"></RatingIcon>
          <HiddenVisually>星1つ</HiddenVisually>
        </RatingLabel>
    </Rating>
    </label>
    </>
  )
};

const Rating = styled.div`
  display: inline-flex;
  flex-direction: row-reverse;
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
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  /* &:hover ~ & {
    color: lightgray;
  }
  &:checked ~ &{
    color: #ffbb00;
  } */
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
    /* padding: 1rem; */
  }
`
