import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import legalDocument from '../legal.md';
import useLocalFile from '../hooks/useLocalFile';

const Legal = () => {
  const markdownContent = useLocalFile(legalDocument);

  return (
    <ReactMarkdown className="scrollable">{markdownContent}</ReactMarkdown>
  );
};

export default Legal;
