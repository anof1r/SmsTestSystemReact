import React from 'react';

function FilterItem(props) {
  return (
    <ul style={{ listStyle: 'none' }}>
      {
        // eslint-disable-next-line react/destructuring-assignment
            props.value.map(f => (
              <li>
                <span style={{ color: 'red' }}>
                  {' '}
                  {f.field_name}
                  {' '}
                </span>
                {' '}
                :
                <span style={{ color: 'green' }}>
                  {' '}
                  {f.value}
                  {' '}
                </span>
                ,
                check_type :
                <strong>
                  {' '}
                  {f.check_type}
                  {' '}
                </strong>
              </li>
            ))
    }
    </ul>
  );
}

export default FilterItem;
