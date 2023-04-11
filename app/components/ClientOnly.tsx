"use client";
import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

type Props = {};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasmounted, setHasmounted] = useState(false);
  useEffect(() => {
    setHasmounted(true);
  }, []);

  if (!hasmounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
