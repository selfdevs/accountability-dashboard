import { useEffect, useState } from 'react';

const useLocalFile = (filePath: string): string => {
  const [markdownContent, setMarkdownContent] = useState<string>(null);

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((markdown) => setMarkdownContent(markdown));
  });

  return markdownContent;
};

export default useLocalFile;
