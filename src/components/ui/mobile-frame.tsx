import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const MobileFrame = styled.div`
  max-width: 375px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export default MobileFrame;
