import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { MetaProps } from 'src/typings/share';

import { InteractiveHead } from '../../../markdown/components/head';
import { Share } from '../common/share';

interface MDXProps extends React.Props<any> {
  id: string;
}

interface MDXRenderProps {
  disableShare?: boolean;
  meta?: MetaProps;
}

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    headerRow: {
      display: 'flex',
      flexDirection: 'row'
    }
  })
);

const h1 = ({ disableShare, meta }: MDXRenderProps) => {
  return ({ children }: MDXProps) => {
    const classes = useStyles({});

    return (
      <div className={classes.headerRow}>
        <Typography variant='h1' style={{ paddingRight: '16px' }}>
          {children}
        </Typography>
        {!disableShare ? <Share {...meta} /> : null}
      </div>
    );
  };
};
const h2 = ({ children, id }: MDXProps) => (
  <InteractiveHead variant='h2' id={id}>
    {children}
  </InteractiveHead>
);
const h3 = ({ children, id }: MDXProps) => (
  <InteractiveHead variant='h3' id={id}>
    {children}
  </InteractiveHead>
);
const h4 = ({ children }: MDXProps) => (
  <Typography variant='h4'>{children}</Typography>
);
const h5 = ({ children }: MDXProps) => (
  <Typography variant='h5'>{children}</Typography>
);
const h6 = ({ children }: MDXProps) => (
  <Typography variant='h6'>{children}</Typography>
);

const components = {
  h2,
  h3,
  h4,
  h5,
  h6
};

interface MdxElementProps {
  content: string;
  disableShare: boolean;
  meta: MetaProps;
}

const MdxElement = ({ content, ...rest }: MdxElementProps) => {
  return (
    <MDXProvider
      components={{
        h1: h1(rest),
        ...components
      }}
    >
      {content}
    </MDXProvider>
  );
};

export default MdxElement;
