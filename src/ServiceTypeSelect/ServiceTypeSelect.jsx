import React, { useState } from 'react';

import classes from './ServiceTypeSelectStyles.module.css';

import FiltersSelectForm from '../FiltersSelectForm/FiltersSelectForm';

function ServiceTypeSelect({ panelState }) {
  const [servType, setServType] = useState('');

  if (panelState) {
    return (
      <div className={classes.div}>
        <label>Service Type</label>
        <select onChange={e => setServType(e.target.value)} id="service_type" name="service_type">
          <option value="1">SMPP</option>
          <option value="2">HTTP SMS</option>
          <option value="3">RCS</option>
        </select>
        {
            servType ? <FiltersSelectForm key={servType} servType={servType} /> : <FiltersSelectForm key={servType} servType={1} />
        }
      </div>
    );
  }
}

export default ServiceTypeSelect;
