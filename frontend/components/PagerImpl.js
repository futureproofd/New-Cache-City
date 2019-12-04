/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PagerBase from "./PagerBase";
import Button from "../styles/containers/Button";
import Span from "../styles/containers/Span";

/**
 *
 * @param {boolean} props extra loading props for animation control
 * Compose our PagerBase with a render-props function
 */
const PagerImpl = props => (
  <PagerBase {...props}>
    {({
 cursor, pagesCount, goPrev, goNext 
}) => {
      const prevBtnText = cursor - 1 === 0 ? " Previous" : "< Previous";
      const nextBtnText = cursor < pagesCount ? "Next >" : "Next ";
      return (
        <div>
          <Button
            secondary={cursor - 1 === 0}
            disabled={cursor - 1 === 0}
            onClick={goPrev}
          >
            {prevBtnText}
          </Button>
          {
            <Span secondary={cursor === pagesCount} loading={props.loading}>
              {cursor} of {pagesCount}
            </Span>
          }
          <Button
            secondary={cursor >= pagesCount}
            disabled={cursor >= pagesCount}
            onClick={goNext}
          >
            {nextBtnText}
          </Button>
        </div>
      );
    }}
  </PagerBase>
);

export default PagerImpl;
