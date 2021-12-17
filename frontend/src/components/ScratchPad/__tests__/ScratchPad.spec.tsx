import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ScratchPad from '../ScrathPad';
import { SAVED, SAVING } from '../constants';
import data from '../../../mocks/scratchpad-data.json';
import { getFromStorage } from '../../../modules/storage/io';

const SAMPLE_TEXT = 'Hello world 🚀';

jest.mock('../../../modules/storage/io');

describe('ScratchPad', () => {
  it('should render with saved string', () => {
    const { getByText } = render(<ScratchPad />);
    expect(getByText(SAVED)).toBeDefined();
  });

  it('should change state while typing', async () => {
    const { getByTestId, getByText } = render(<ScratchPad />);
    const textArea = getByTestId('scratch-pad');
    fireEvent.change(textArea, { target: { value: '' } });
    await expect(getByText(SAVING)).toBeDefined();
    await waitFor(() => {
      expect(getByText(SAVED)).toBeDefined();
    });
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
