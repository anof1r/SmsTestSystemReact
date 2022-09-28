import React from 'react';

function FiltersList({ filterList }) {
  return (
    filterList.map(filter => (
      <li>
        {' '}
        {filter.servField}
        :
        {' '}
        {filter.value}
        , check_type:
        {' '}
        {filter.checkType}
        {' '}
      </li>
    ))
  );
}

export default FiltersList;
