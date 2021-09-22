import { CSSObject } from '@emotion/react';
import {
  ColumnsCSS,
  LaserCSS,
  cubesceneCSS,
  cubeCSS,
  cube__faceCSS,
} from './styles';

interface OwnProps {
  playerColor: string;
  disableLaser?: boolean;
  top?: string;
  left?: string;
  scale?: number;
  invertMovement?: boolean;
}
export default function MonolithVisualisation({
  playerColor,
  disableLaser = false,
  top = '10%',
  left = '10%',
  scale = 1,
  invertMovement = false,
}: OwnProps) {
  return (
    <div css={ColumnsCSS}>
      <div
        css={{
          ...cubesceneCSS(scale, scale),
          top: top,
          left: `calc(${left} - ${scale / 4}em}`,
        }}
      >
        <div css={cubeCSS(invertMovement)}>
          <div css={cube__faceCSS('front', scale, scale)}></div>
          <div css={cube__faceCSS('back', scale, scale)}></div>
          <div css={cube__faceCSS('right', scale, scale)}></div>
          <div css={cube__faceCSS('left', scale, scale)}></div>
          <div css={cube__faceCSS('top', scale, scale)}></div>
          <div css={cube__faceCSS('bottom', scale, scale)}></div>
        </div>
      </div>
    </div>
  );
}
