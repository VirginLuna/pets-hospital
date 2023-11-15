import Box, { BoxProps } from '@mui/material/Box';
import classNames from 'classnames';
import { PropsWithChildren, useMemo } from 'react';

export interface BlockProps extends PropsWithChildren, BoxProps {}

export default function Block(props: BlockProps) {
  const sx = useMemo(() => {
    return { bgcolor: 'white', ...(props.sx || {}) };
  }, [props.sx]);

  return (
    <Box {...props} className={classNames('manager-block', props.className)} sx={sx}>
      {props.children}
    </Box>
  );
}
