/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

/**
 * Base Pager takes a render-props function as it's argument
 */
class PagerBase extends Component {
  state = {
    cursor: this.props.cursor || 1,
    pagesCount: this.props.pagesCount || 0,
  };

  // core functionality - callback impl gets local cursor state
  changePage = (newCursor) => {
    this.setState(
      () => ({
        cursor: newCursor,
      }),
      () => this.props.onPageChange(this.state.cursor),
    );
  };

  /**
   * Render-Props: or returns a function to determine rendering
   * Allows us to specify what the rendered controls should look like (i.e, buttons)
   */
  render() {
    const { cursor, pagesCount } = this.state;
    return this.props.children({
      cursor,
      pagesCount,
      goPrev: () => {
        this.changePage(this.state.cursor - 1);
      },
      goNext: () => {
        this.changePage(this.state.cursor + 1);
      },
      changePage: this.changePage,
    });
  }
}

export default PagerBase;
