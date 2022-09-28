import React from 'react';

export default function ItemsList({
  filters, setFilterDeleted, changeKey, changeMode,
}) {
  if (filters) {
    return (
      <div style={{ background: 'white' }}>
        {filters.map(filter => (
          <li>
            &quot;
            {filter.field }
            &quot;
            :
            {' '}
            {filter.value}
            {' '}
            ,
            {' '}
            &quot;check_type&quot; :
            {' '}
            {filter.check_type }
            {' '}
            <button
              id="btn"
              type="button"
              style={{ float: 'right' }}
              onClick={() => {
                setFilterDeleted(filter);
                changeKey();
              }}
            >
              X
            </button>
          </li>
        ))}
      </div>
    );
  }
}
