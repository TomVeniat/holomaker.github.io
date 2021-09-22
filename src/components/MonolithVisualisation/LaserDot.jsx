/** @jsxImportSource @emotion/react */
import { ColumnsCSS, LaserDotCSS } from './styles';

export default function LaserDot({ playerColor, glow = true }) {
  return (
    <div css={ColumnsCSS}>
      <div css={LaserDotCSS(playerColor, glow)}></div>
    </div>
  );
}
