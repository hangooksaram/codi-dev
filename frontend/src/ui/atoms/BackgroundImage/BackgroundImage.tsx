import styled from "@emotion/styled";

export const backgroundImage = (src: string) => {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
  };
};
