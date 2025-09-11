import { useEffect } from 'react';

const BASE_TITLE = 'Praia: AI Prompt Suite';

const usePageTitle = (pageTitle: string) => {
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | ${BASE_TITLE}`;
    } else {
      document.title = BASE_TITLE;
    }
  }, [pageTitle]);
};

export default usePageTitle;
