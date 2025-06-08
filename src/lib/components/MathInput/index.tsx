import { MathJax } from "better-react-mathjax";
import { FC } from "react";

type Props = React.ComponentProps<typeof MathJax> & {
  content: string;
};

export const MathInput: FC<Props> = ({ content, ...props }) => {
  return (
    <MathJax
      dynamic
      style={{
        padding: "8px",
        width: "100%",
        whiteSpace: "pre-line",
        marginTop: "8px",
        marginBottom: "8px",
      }}
      {...props}
    >
      {content}
    </MathJax>
  );
};
