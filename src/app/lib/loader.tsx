import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { tailChase } = await import("ldrs");
      tailChase.register();
    }
    getLoader();
  }, []);
  return <l-tail-chase size="150" color="white"></l-tail-chase>;
}

export function ChatLoader() {
  useEffect(() => {
    async function getLoader() {
      const { bouncy } = await import("ldrs");
      bouncy.register();
    }
    getLoader();
  }, []);
  return <l-bouncy size="40" color="gray"></l-bouncy>;
}
