import React, { useEffect, useState } from 'react';
import { Field, Formik, Form } from 'formik';
import JSONPretty from 'react-json-pretty';

import classes from './MainFormFormik.module.css';

import {
  useCheckTypes, useServiceFields, useServiceTypeApi, useResponseTypes, useRuleApi,
} from '../hooks';
import ItemsList from '../ItemsList/ItemsList';

let filters = [];
let response = { fields: {} };
function MainFormFormik({
  panelState, changeMode, initialData, setChangeMode,
}) {
  const [selectedServType, setSelectedServType] = useState('');
  const { serviceTypes, getServiceTypes } = useServiceTypeApi();
  const { serviceFields, getServiceFields } = useServiceFields();
  const { checkTypes, getCheckTypes } = useCheckTypes('');
  const { responseTypes, getResponseTypes } = useResponseTypes('');
  const { postRule } = useRuleApi();
  const { putRule } = useRuleApi();
  const [filterDeleted, setFilterDeleted] = useState({});
  const [renderState, setRenderState] = useState(0);
  const changeKey = () => {
    setRenderState(renderState + 1);
  };
  useEffect(() => {
    filters = filters.filter(filter => !(filter.field_name === filterDeleted.field_name && filter.value === filterDeleted.value && filter.check_type === filterDeleted.check_type));
  }, [filterDeleted]);
  useEffect(() => {
    getServiceTypes({});
  }, []);
  useEffect(() => {
    if (selectedServType) {
      getServiceFields({ id: selectedServType });
    } else {
      getServiceFields({ id: 1 });
    }
  }, [selectedServType]);
  useEffect(() => {
    getCheckTypes({});
  }, [selectedServType]);
  useEffect(() => {
    getResponseTypes({ id: 1 });
  }, [selectedServType]);
  useEffect(() => {
    if (initialData?.filters) {
      filters = initialData.filters.map((data) => {
        const field = serviceFields.find(f => f.name === data.field_name);
        return {
          field: field.name,
          check_type: data.check_type,
          value: data.value,
        };
      });
    }
  }, [initialData]);
  useEffect(() => {
    response = { fields: {} };
    if (initialData?.responces) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(initialData.responces)) {
        response.fields[key] = value;
      }
    }
  }, [initialData]);
  useEffect(() => {
    filters = [];
    initialData = [];
  }, [changeMode]);

  const setFilters = (values) => {
    const checkType = checkTypes.find(type => type.id === Number(values.check_type));
    const fieldName = serviceFields.find(field => field.id === Number(values.field_name));
    filters.push({
      field: fieldName.name,
      check_type: checkType.name,
      value: values.value,
    });
  };
  const setRegistry = (values) => {
    if (!response.delay) {
      response.delay = values.delay;
    }
    if (!response.type) {
      if (initialData.response_type) {
        const resType = responseTypes.find(type => type.name === initialData.response_type);
        response.type = Number(resType.id);
      } else {
        response.type = Number(values.response_type);
      }
    }
    response.fields[values.resp_field] = values.resp_value;
  };

  if (changeMode) {
    return (
      <div className={panelState ? classes.div : classes.divClosed}>
        <h1>Edit panel</h1>
        <button type="button" onClick={() => setChangeMode(false)}> Back to add panel</button>
        <Formik
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            const servId = serviceTypes.find(service => service.name === values.service_type);
            const filtersArr = filters.map((filter) => {
              const fieldId = serviceFields.find(type => type.name === filter.field);
              const checkTypeName = checkTypes.find(type => type.name === filter.check_type);
              const filtersWithIds = {
                field: fieldId.id,
                check_type: checkTypeName.id,
                value: filter.value,
              };
              return filtersWithIds;
            });
            const rule = {
              service_type: servId.id,
              filters: filtersArr,
              response,
            };
            putRule({ body: rule, id: initialData.id });
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
          initialValues={initialData}
        >
          {({
            values,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <label>Service Type</label>
              <Field
                as="select"
                disabled="true"
                name="service_type"
                placeholder="Select service type"
                onChange={(e) => {
                  setFieldValue('service_type', e.target.value);
                  setSelectedServType(e.target.value);
                }}
              >
                {serviceTypes.map(type => (<option value={type.id}>{type.name}</option>))}
              </Field>
              <div style={{ background: '#e1e7ee' }}>
                <label>Filters</label>
                <Field
                  as="select"
                  name="field_name"
                >
                  <option> Select service fields </option>
                  {serviceFields.map(field => (<option value={field.id}>{field.name}</option>))}
                </Field>
                <Field
                  as="input"
                  name="value"
                  placeholder="enter value"
                />
                <Field
                  as="select"
                  name="check_type"
                >
                  <option> Select check type </option>
                  {checkTypes.map(checkType => (<option value={checkType.id}>{checkType.name}</option>))}
                </Field>
                <button
                  type="button"
                  onClick={() => {
                    setFilters(values);
                    changeKey();
                  }}
                  style={{ float: 'right' }}
                >
                  {' '}
                  Add filter

                </button>
                <div style={{ padding: '10px' }}>
                  <ul style={{ listStyle: 'none' }}>
                    <ItemsList
                      key={renderState}
                      filters={filters}
                      selectedCheckType={values.check_type}
                      selectedServType={selectedServType}
                      setFilterDeleted={setFilterDeleted}
                      changeKey={changeKey}
                      changeMode={changeMode}
                    />
                  </ul>
                </div>
                <label>Response</label>
                <Field
                  as="select"
                  name="response_type"
                >
                  <option> Select response type </option>
                  {responseTypes.map(resType => (<option value={resType.name}>{resType.name}</option>))}
                </Field>
                <Field
                  as="input"
                  name="delay"
                  placeholder="Delay"
                  type="number"
                  id="delay"
                />
                <Field
                  as="input"
                  name="resp_field"
                  placeholder="field"
                />
                <Field
                  as="input"
                  name="resp_value"
                  placeholder="value"
                />
                <div style={{ padding: '10px', overflow: 'auto', background: 'white' }}>
                  <JSONPretty id="json-pretty2" data={response} />
                </div>
                <button type="button" onClick={() => setRegistry(values)} style={{ float: 'right' }}> Add response </button>
              </div>
              <button type="submit" disabled={isSubmitting}>
                edit Rule
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return (
    <div className={panelState ? classes.div : classes.divClosed}>
      <h1>Add panel</h1>
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          const servId = serviceTypes.find(service => service.id === Number(values.service_type));
          const filtersArr = filters.map((filter) => {
            const fieldId = serviceFields.find(type => type.name === filter.field);
            const checkTypeName = checkTypes.find(type => type.name === filter.check_type);
            const filtersWithIds = {
              field: fieldId.id,
              check_type: checkTypeName.id,
              value: filter.value,
            };
            return filtersWithIds;
          });
          const rule = {
            service_type: servId.id,
            filters: filtersArr,
            response,
          };
          postRule({ body: rule });
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
        initialValues={{}}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <label>Service Type</label>
            <Field
              as="select"
              name="service_type"
              placeholder="test"
              onChange={(e) => {
                setFieldValue('service_type', e.target.value);
                setSelectedServType(e.target.value);
              }}
            >
              <option>Select service type</option>
              <option value={1}>SMS SMPP</option>
            </Field>
            <div style={{ background: '#e1e7ee' }}>
              {selectedServType && <label>Filters</label>}
              {
                          selectedServType && (
                          <>
                            <Field
                              as="select"
                              name="field_name"
                            >
                              <option>Select service field</option>
                              {serviceFields.map(field => (<option value={field.id}>{field.name}</option>))}
                            </Field>
                            <Field
                              as="input"
                              name="value"
                              placeholder="enter value"
                            />
                            <Field
                              as="select"
                              name="check_type"
                            >
                              <option>Select check type</option>
                              {checkTypes.map(checkType => (<option value={checkType.id}>{checkType.name}</option>))}
                            </Field>
                            <button
                              type="button"
                              onClick={() => {
                                setFilters(values);
                                changeKey();
                              }}
                              style={{ float: 'right' }}
                            >
                              {' '}
                              Add filter
                            </button>
                            <div style={{ padding: '10px' }}>
                              <ul style={{ listStyle: 'none' }}>
                                <ItemsList
                                  key={renderState}
                                  filters={filters}
                                  selectedCheckType={values.check_type}
                                  selectedServType={selectedServType}
                                  setFilterDeleted={setFilterDeleted}
                                  changeKey={changeKey}
                                />
                              </ul>
                            </div>
                            <label>Response</label>
                            <Field
                              as="select"
                              name="response_type"
                            >
                              <option>Select response type</option>
                              {responseTypes.map(resType => (<option value={resType.id}>{resType.name}</option>))}
                            </Field>
                            <Field
                              as="input"
                              name="delay"
                              placeholder="Delay"
                            />
                            <Field
                              as="input"
                              name="resp_field"
                              placeholder="field"
                            />
                            <Field
                              as="input"
                              name="resp_value"
                              placeholder="value"
                            />
                            <button type="button" onClick={() => setRegistry(values)} style={{ float: 'right' }}> Add response </button>
                          </>
                          )
                      }
            </div>
            <button type="submit" disabled={isSubmitting}>
              add Rule
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MainFormFormik;
