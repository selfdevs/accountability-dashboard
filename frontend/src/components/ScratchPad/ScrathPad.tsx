import React, { FC } from 'react';
import Card from '../Card';
import './stylesheet.css';
import { useScratchPad } from './hooks';

type ScratchPadProps = {
  defaultText: string;
};

const ScratchPad: FC<ScratchPadProps> = ({ defaultText }) => {
  const { loadingText, value, onChangeHandler } = useScratchPad(defaultText);

  return (
    <Card className="flex-column scratch-card">
      <h2 className="scratch-title">Scratchpad</h2>
      <p className="scratch-loading">{loadingText}</p>
      <textarea
        className="scratch-area"
        value={value}
        data-testid="scratch-pad"
        onChange={onChangeHandler}
      />
    </Card>
  );
};

export default ScratchPad;
