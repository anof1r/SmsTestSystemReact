import React, { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import FilterItem from './FilterItem';
import ResponceItem from './ResponceItem';

function RulesGrid({
  rules, setChangeMode, setInitialData, setPanelState,
}) {
  const gridRef = useRef();
  const rowData = [];

  rules.forEach((rule) => {
    rowData.push({
      id: rule.id,
      service_type: rule.service_type,
      filters: rule.response_rule_checker,
      response_type: rule.response_type,
      delay: rule.delay,
      responces: rule.registry,
    });
  });
  const columnDefs = [
    {
      field: 'service_type', width: 60, resizable: false, cellStyle: { justifyContent: 'center' },
    },
    {
      field: 'filters', cellRenderer: FilterItem, autoHeight: true, width: 240, resizable: false, justifyContent: 'left',
    },
    { field: 'response_type', width: 60 },
    {
      field: 'delay', colId: 'delay', width: 60,
    },
    {
      field: 'responces', cellRenderer: ResponceItem, autoHeight: true, width: 180, textAlign: 'left',
    },
  ];
  const onRowClicked = useCallback((e) => {
    setChangeMode(true);
    setPanelState(true);
    setInitialData(e.data);
  });
  const onFirstDataRendered = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const onGridSizeChanged = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  });
  const defaultColDef = useMemo(() => ({
    resizable: true,
    suppressMovable: true,
  }), []);

  return (
    <div style={{ width: '100%' }}>
      <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onFirstDataRendered={onFirstDataRendered}
          onGridSizeChanged={onGridSizeChanged}
          onRowClicked={onRowClicked}
        />
      </div>
    </div>
  );
}

export default RulesGrid;
