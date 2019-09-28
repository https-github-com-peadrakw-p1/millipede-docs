import { useHoux } from 'houx';
import React, { useEffect, useState } from 'react';

import { RootState } from '../../redux/reducers';
import { MdxDocs } from '../mdx';

const load = (pathSlice = '', userLanguage = ''): any =>
  import(`../../../pages${pathSlice}index${userLanguage}.mdx`)
    .then(result => {
      return {
        content: result.default,
        raw: result.raw
      };
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log(error);
    });

export interface MDXContentLoaderProps {
  path: string;
}

const MDXContentLoader: React.FC<MDXContentLoaderProps> = ({ path }) => {
  const [contentMain, setContentMain] = useState('');
  const [rawMain, setRawMain] = useState('');
  const { state }: { state: RootState } = useHoux();
  useEffect(() => {
    const loadContent = async () => {
      let content: any;
      if (state.language.userLanguage === 'de') {
        content = await load(path, '-de');
      } else {
        content = await load(path);
      }
      setContentMain(content.content);
      setRawMain(content.raw);
    };
    loadContent();
  }, [state.language.userLanguage]);

  return <MdxDocs content={contentMain} raw={rawMain} />;
};

export default MDXContentLoader;

/**
 * import React from 'react';
 * import { MdxDocs } from '../../../../docs/src/modules/components/mdx';
 * import content, { ast, headingsMap, meta, raw } from '../../../../docs/src/pages/pidp/approach/byExample/index.mdx';
 * const Page = () => {
 *   return <MdxDocs content={content} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
 * };
 * export default Page;
 */