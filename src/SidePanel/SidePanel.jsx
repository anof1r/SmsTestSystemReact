import React from 'react';

import classes from './SidePanel.module.css';

import MainFormFormik from '../MainFormFormik/MainFormFormik';

function SidePanel({
  initialData, changeMode, setPanelState, panelState, setFiltersArr, setChangeMode,
}) {
  return (
    <div className={panelState ? classes.panelOpen : classes.panelClosed}>
      <button type="button" className={classes.btn} onClick={() => setPanelState(!panelState)}>
        {panelState ? 'X' : '<--' }
      </button>
      <MainFormFormik panelState={panelState} initialData={initialData} changeMode={changeMode} setFiltersArr={setFiltersArr} setChangeMode={setChangeMode} />
    </div>
  );
}

export default SidePanel;
