/* eslint-disable react/prop-types */
import React from 'react';

import { Highlight, connectRefinementList } from 'react-instantsearch-dom';

class RefinementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInput: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.items.length !== prevProps.items.length) {
      this.props.searchForItems(this.state.userInput);
    }
  }

  handleChange(event) {
    let value = event.currentTarget.value;
    this.setState({ userInput: value });
    this.props.searchForItems(value);
    console.log(this.state.userInput);
  }

  render() {
    const { items, isFromSearch, refine, createURL } = this.props;

    return (
      <ul>
        <li>
          <input type="search" onChange={this.handleChange} />
        </li>
        {items.map(item => (
          <li key={item.label}>
            <a
              href={createURL(item.value)}
              style={{ fontWeight: item.isRefined ? 'bold' : '' }}
              onClick={event => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              {isFromSearch ? (
                <Highlight attribute="label" hit={item} />
              ) : (
                item.label
              )}{' '}
              ({item.count})
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

const CustomRefinementList = connectRefinementList(RefinementList);

export default CustomRefinementList;
