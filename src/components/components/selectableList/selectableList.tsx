import React, { useEffect, useRef, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { LoadingIndicator } from '..';
import { useTimeout } from '../../hooks';

import SelectableListItem from './selectableListItem';
import { SelectableListOption } from './SelectableListOption';

const Container = styled('div')`
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

interface Props {
  options: Array<SelectableListOption>;
  activeIndex: number;
  loading?: boolean;
}

const SelectableList = ({ options, activeIndex, loading }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useTimeout(() => setIsMounted(true), 350);

  /** Always make sure the selected item is within the screen's view. */
  useEffect(() => {
    // Delay "isMounted" so that the enter animation doesn't get interrupted.
    // I was stuck on this for like 12 hours and was wondering why
    // the animation wasn't finishing...
    if (isMounted && containerRef.current && options.length) {
      const { children } = containerRef.current;
      children[activeIndex].scrollIntoView({
        block: 'nearest'
      });
    }
  }, [activeIndex, isMounted, options.length]);

  return (
    <AnimatePresence>
      {loading ? (
        <LoadingIndicator backgroundColor='white' />
      ) : (
        <Container ref={containerRef}>
          {options.map((option, index) => (
            <SelectableListItem
              key={`option-${option.label}-${index}`}
              option={option}
              isActive={index === activeIndex}
            />
          ))}
        </Container>
      )}
    </AnimatePresence>
  );
};

export default SelectableList;
