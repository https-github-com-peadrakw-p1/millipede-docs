import { useHoux } from 'houx';
import React, { useEffect, useState } from 'react';

import { RootState } from '../../redux/reducers';
import { Logger } from '../../utils/logging';
import { MdDocs } from '../md';

const load = (pathSlice = '', userLanguage = ''): any =>
  import(`../../../pages${pathSlice}index${userLanguage}.md`)
    .then(result => {
      return result.default;
    })
    .catch(error => {
      Logger.log(error);
    });

export interface MDContentLoaderProps {
  path: string;
}

const MDContentLoader: React.FC<MDContentLoaderProps> = ({ path }) => {
  const [contentMain, setContentMain] = useState('');
  const { state }: { state: RootState } = useHoux();
  useEffect(() => {
    const loadContent = async () => {
      let content: any;
      if (state.language.userLanguage === 'en') {
        content = await load(path, '-en');
      } else {
        content = await load(path);
      }
      setContentMain(content);
    };
    loadContent();
  }, [state.language.userLanguage]);

  return <MdDocs content={contentMain} />;
};

export default MDContentLoader;

/**
 *
 * Note: Option (!!) - does not look at the global web-pack loader
 * option (test) to handle file extentions
 * import content from '!!raw-loader!../../docs/src/pages/guides/api/index.md';
 *
 * as raw-loader is defined in the web-pack configuration to handle .md files
 * import content from "../../docs/src/pages/guides/api/index.md";
 *
 */

/**
 * import React from 'react';
 * import { MdDocs } from '../../docs/src/modules/components/md';
// import content from '../../docs/src/pages/guides/api/index.md';
 * const Page = () => {
 *   return <MdDocs content={content} />;
 * };
 * export default Page;
 */
