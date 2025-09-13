import React from "react";

export const WithLoading = (Comp: React.FC<Record<string, any>>) => {
  return (props: React.ComponentProps<typeof Comp> & { loading?: boolean }) => {
    if (props.loading) {
      return <div>Loading...</div>;
    }
    return <Comp {...props} />;
  };
};
