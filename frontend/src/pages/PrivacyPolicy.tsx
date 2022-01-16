import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import privacyPolicyDocument from '../privacy-policy.md';
import useLocalFile from '../hooks/useLocalFile';

const PrivacyPolicy = () => {
  const markdownContent = useLocalFile(privacyPolicyDocument);

  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

export default PrivacyPolicy;
