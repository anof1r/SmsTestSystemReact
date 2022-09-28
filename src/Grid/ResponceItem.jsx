import React from 'react';
import JSONPretty from 'react-json-pretty';

function ResponceItem(props) {
  return (
    <ul>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <JSONPretty id="json-pretty" data={props.value} />
    </ul>
  );
}

export default ResponceItem;
