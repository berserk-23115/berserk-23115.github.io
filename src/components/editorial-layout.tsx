import { Children, type ComponentProps } from "react";
import { HStack as AstryxHStack } from "@astryxdesign/core/HStack";
import { VStack as AstryxVStack } from "@astryxdesign/core/VStack";

// Normalize server-rendered children before Astryx's polymorphic createElement.
export function HStack({
  children,
  ...props
}: ComponentProps<typeof AstryxHStack>) {
  return <AstryxHStack {...props}>{Children.toArray(children)}</AstryxHStack>;
}
export function VStack({
  children,
  ...props
}: ComponentProps<typeof AstryxVStack>) {
  return <AstryxVStack {...props}>{Children.toArray(children)}</AstryxVStack>;
}
