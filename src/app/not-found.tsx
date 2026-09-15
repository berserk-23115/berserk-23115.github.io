import { CoreArt } from "@/components/core-art";
import { VStack } from "@/components/editorial-layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <VStack
      as="main"
      className="portfolio section-pad"
      minHeight="100svh"
      justify="center"
      gap={8}
    >
      <p className="eyebrow">Signal lost / 404</p>
      <h1>Nothing at these coordinates.</h1>
      <p>The page may have moved. The work is still here.</p>
      <Link className="primary-link" href="/">
        Return to index ↗
      </Link>
      <figure
        style={{ width: "40%", position: "absolute", right: 0, opacity: 0.25 }}
      >
        <CoreArt compact />
      </figure>
    </VStack>
  );
}
