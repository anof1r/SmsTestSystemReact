import React, { useState } from 'react';
import { useQuery } from 'react-query';

import classes from './FiltersSelectStyles.module.css';
import FiltersList from './FiltersList';

import { fetchServices } from '../services/fetchServices';

function FiltersSelectForm({ servType }) {
  const {
    isLoading, isError, data: fields, error,
  } = useQuery('fields', () => fetchServices.getServiceFields(servType));
  const { isLoading: isLoadingCt, isError: isErrorCT, data: checkTypes } = useQuery('check_types', () => fetchServices.getCheckTypes());

  const [servField, setServField] = useState('');
  const [value, setValue] = useState('');
  const [selectedCheckType, setSelectedCheckType] = useState('');
  const [click, setClick] = useState(false);
  const [filterList] = useState([]);

  // eslint-disable-next-line no-shadow
  const setFilterList = (servField, value, selectedCheckType) => {
    filterList.push({ servField, value, checkType: selectedCheckType });
  };

  const handleBtn = (bool) => {
    setClick(!bool);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (isLoadingCt.isLoading) {
    return <span>Loading...</span>;
  }

  if (isErrorCT.isError) {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  if (fields.data && checkTypes?.data) {
    return (
      <div>
        <label htmlFor="field_name">FIlters</label>
        <select onChange={e => setServField(e.target.value)} id="field_name" name="field_name">
          {
                        fields.data.map(field => (
                          <option value={`${field.name}`}>
                            {' '}
                            {field.name}
                            {' '}
                          </option>
                        ))
                    }
        </select>
        <input className={classes.input} type="text" name="value" placeholder="value" onChange={handleChange} />
        <select name="check_type" onChange={e => setSelectedCheckType(e.target.value)}>
          {
                        checkTypes.data.map(type => (
                          <option value={`${type.name}`}>
                            {' '}
                            {type.name}
                            {' '}
                          </option>
                        ))
                    }
        </select>
        <button
          type="button"
          onClick={() => {
            handleBtn(false);
            setFilterList(servField, value, selectedCheckType);
          }}
        >
          Add filter
        </button>
        <ul>
          {
                        click ? <FiltersList filterList={filterList} key={click} /> : undefined
                    }
        </ul>
      </div>
    );
  }
}

export default FiltersSelectForm;
