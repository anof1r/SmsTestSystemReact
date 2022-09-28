import React from 'react';

import classes from './MainFormStyles.module.css';

import ServiceTypeSelect from '../ServiceTypeSelect/ServiceTypeSelect';

function MainForm({ panelState }) {
  if (panelState) {
    return (
      <div className={classes.div}>
        <form>
          <ServiceTypeSelect panelState={panelState} />
        </form>
      </div>
    );
  }
}

export default MainForm;
