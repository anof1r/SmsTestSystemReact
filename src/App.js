import './App.css';
import React, { useEffect, useState } from 'react';

import RulesGrid from './Grid/RulesGrid';
import { useRuleApi } from './hooks';
import SidePanel from './SidePanel/SidePanel';

function App() {
  const { rule, getRule } = useRuleApi();
  const [changeMode, setChangeMode] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [panelState, setPanelState] = useState(false);
  useEffect(() => {
    getRule({});
  }, []);
  return (
    <div className="App">
      <SidePanel
        changeMode={changeMode}
        initialData={initialData}
        setInitialData={setInitialData}
        panelState={panelState}
        setPanelState={setPanelState}
        setChangeMode={setChangeMode}
      />
      <RulesGrid
        rules={rule}
        setChangeMode={setChangeMode}
        setInitialData={setInitialData}
        setPanelState={setPanelState}
      />
    </div>
  );
}

export default App;
