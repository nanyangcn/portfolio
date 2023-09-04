// import { CSSProperties } from 'react';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
// import dark from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

// SyntaxHighlighter.registerLanguage('tsx', tsx);

// interface MinimapProps {
//   encodedText: string
// }

// function Minimap({ encodedText }: MinimapProps) {
//   const style: CSSProperties = {
//     margin: 0,
//     backgroundColor: 'transparent',
//     padding: '64px 64px 100% 16px',
//     scrollPaddingTop: '-32px',
//     lineHeight: '26px',
//     transform: 'scale(0.14)',
//     transformOrigin: 'top right',
//     overflow: 'hidden',
//   };

//   return (
//     <div className="pointer-events-none absolute inset-y-0 right-0 w-full">
//       <SyntaxHighlighter
//         className=""
//         language="tsx"
//         style={dark}
//         customStyle={style}
//       >
//         {atob(encodedText)}
//       </SyntaxHighlighter>
//     </div>
//   );
// }

// export default Minimap;
