import React from 'react';
import { render } from '@testing-library/react';
import ScratchPad from '../ScrathPad';
import { SAVED } from '../constants';
import data from '../../../mocks/scratchpad-data.json';
import { getFromStorage } from '../../../modules/storage/io';

const SAMPLE_TEXT = 'Hello world 🚀';

jest.mock('../../../modules/storage/io');

describe('ScratchPad', () => {
  it('should render with saved string', () => {
    const { getByText } = render(<ScratchPad />);
    expect(getByText(SAVED)).toBeDefined();
  });

  it('should render with stored text', () => {
    (getFromStorage as jest.Mock).mockReturnValueOnce(SAMPLE_TEXT);
    const { getByDisplayValue } = render(<ScratchPad />);
    expect(getByDisplayValue(SAMPLE_TEXT)).toBeDefined();
  });

  it('should render with default text', () => {
    const { getByDisplayValue } = render(<ScratchPad />);
    expect(getByDisplayValue(data.text)).toBeDefined();
  });
});
