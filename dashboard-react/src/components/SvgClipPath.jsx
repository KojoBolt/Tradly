// SvgClipPath.jsx
const SvgClipPath = () => (
  <svg width="0" height="0">
    <defs>
      <clipPath id="customCardShape" clipPathUnits="objectBoundingBox">
        <path d="M0,0.1 C0,0.04,0.04,0,0.1,0 H0.8 C0.86,0,0.9,0.02,0.92,0.05 C0.95,0.02,0.98,0,1,0.02 V0.9 C1,0.96,0.96,1,0.9,1 H0.1 C0.04,1,0,0.96,0,0.9 V0.1 Z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgClipPath;