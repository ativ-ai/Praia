
import { useEffect } from 'react';

const BASE_TITLE = 'PRAIA: Prompt Research & AI Architect';

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
