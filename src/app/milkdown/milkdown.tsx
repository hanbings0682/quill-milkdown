import type { FC } from "react";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { atPlugin } from "./at";

const markdown = `# Milkdown React Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **React**.`;

export const MilkdownEditor: FC = () => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: markdown,
    })
    
    crepe.editor.use(atPlugin)
    crepe.editor.action((ctx) => {
      console.log("4")
    })
    crepe.on((lis) => {
      lis.markdownUpdated((ctx, markdown, prev) => {
        console.log("5")
      })
    })

    return crepe;
  }, []);

  return <Milkdown />;
};


export default function MilkdownEditorWrapper() {
  return (
    <div className="h-96 w-[1280px]">
      <MilkdownProvider>
        <MilkdownEditor />
      </MilkdownProvider>
    </div>
  );
};