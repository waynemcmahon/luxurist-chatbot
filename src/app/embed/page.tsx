"use client";

import { Cta } from "@/components/Cta";
import { TypeFormChat } from "@/components/TypeFormChat/TypeFormChat";
import Image from "next/image";
import MagicContainer from "@/components/Layout/MagicContainer";

export default function EmbedPage() {
  return (
    <MagicContainer> 
      <TypeFormChat 
        placement="inline" 
        formsparkId="Ku1lXEbvx" 
        googleSheetsUrl="https://script.google.com/macros/s/AKfycby9fY9jU76Rb0xVSLNqIiEZgO2-FE7sh4lK1eBFd5-wE6EWXEnMOHr2FM9L9aZ-kCxl5A/exec"
      />
    </MagicContainer>
  );
}
