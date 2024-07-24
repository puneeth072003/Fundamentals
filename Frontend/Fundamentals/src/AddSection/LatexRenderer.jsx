import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const LatexRenderer = ({ latex }) => {
  return <InlineMath math={latex} />;
};

export default LatexRenderer;