"use client";

import { Providers } from "@/components/Providers";
import { Root } from "@/components/Root/Root";
import { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  return (
    <Root>
      <Providers>{children}</Providers>
    </Root>
  );
}

