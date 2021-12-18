import React, { useCallback, useState } from 'react';
import Card from '../Card';
import './stylesheet.css';
import data from '../../mocks/scratchpad-data.json';

const ScratchPad = () => {
  const [value, setValue] = useState<string>(data.text);

  const onChangeHandler = useCallback((e) => {
    setValue(e.target.value);
  });

  return (
    <Card>
      <h2 className="scratch-title">Scratchpad</h2>
      <textarea className="scratch-area" value={value} onChange={onChangeHandler} />
    </Card>
  );
};

export default ScratchPad;
