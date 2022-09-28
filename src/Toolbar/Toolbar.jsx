import React from 'react';

import classes from './Toolbar.module.css';

function Toolbar() {
  return (
    <div className={classes.toolbar}>
      <div className="title"> SMS System Test Framework </div>
      <div style={{ marginLeft: 'auto' }} className="burger">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          &#x2630;
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
