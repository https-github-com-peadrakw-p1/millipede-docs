import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHoux } from 'houx';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import { Page } from '../../../../../src/typings/data/import';
import { RootState } from '../../redux/reducers';
import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Breadcrumbs from '../common/breadcrumbs';
import EditPage from '../Editpage';
import useMarkdownDocsContents from '../useMarkdownDocsContents';
import MdElement from './MdElement';

interface MarkdownDocsProps {
  content: string;
  markdownLocation?: string;
}

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    headerSpace: {
      flexGrow: 1
    },
    appFrameSpace: {
      flexGrow: 1
    }
  })
);

const SOURCE_CODE_ROOT_URL = 'https://github.com/gurkerl83/millipede-docs/blob/master/docs/src';

export const MdDocs = (props: MarkdownDocsProps) => {
  const classes = useStyles({});
  const { content, markdownLocation: markdownLocationProp } = props;

  const {
    state: {
      navigation: { activePage }
    }
  }: { state: RootState } = useHoux();

  const { markdownLocation } = useMarkdownDocsContents({
    markdown: content,
    markdownLocation: markdownLocationProp,
    activePage: activePage ? activePage : ({ pathname: '' } as Page)
  });

  return (
    <AppFrame>
      <AppContent>
        {!isMobileOnly ? (
          <div className={classes.header}>
            <Breadcrumbs />
            <div className={classes.headerSpace} />
            <EditPage
              markdownLocation={markdownLocation}
              sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
            />
          </div>
        ) : null}
        <MdElement content={content} />
      </AppContent>
      <div className={classes.appFrameSpace} />
      <AppTableOfContents content={content} />
    </AppFrame>
  );
};

export default MdDocs;
