import { useState, type FC } from "react";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import "./milkdown-overrides.css";
import { atDirectiveNode, atHighlightDirective, atInputRule } from "./at";

const markdown = "";

export const MilkdownEditor: FC = () => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: markdown,
      features: {
        [Crepe.Feature.ImageBlock]: false,
        [Crepe.Feature.Table]: false,
        [Crepe.Feature.LinkTooltip]: false,
      },
      featureConfigs: {
        [Crepe.Feature.Placeholder]: {
          text: '有什么想和大家分享的？',
          mode: 'block',
        },
        [Crepe.Feature.BlockEdit]: {
          slashMenuTextGroupLabel: "文字",
          slashMenuListGroupLabel: "列表",
          slashMenuAdvancedGroupLabel: "高级",
          slashMenuH1Label: "标题",
          slashMenuQuoteLabel: "引用",
          slashMenuDividerLabel: "分割线",
          slashMenuBulletListLabel: "无序列表",
          slashMenuOrderedListLabel: "有序列表",
          slashMenuTaskListLabel: "任务列表",
          slashMenuCodeBlockLabel: "代码块",
          slashMenuMathLabel: "数学公式",

          buildMenu: (builder) => {
            builder.getGroup("text").group.items = 
              builder.getGroup("text").group.items
                .filter((item) => item.key !== "h2")
                .filter((item) => item.key !== "h3")
                .filter((item) => item.key !== "h4")
                .filter((item) => item.key !== "h5")
                .filter((item) => item.key !== "h6")

            builder.getGroup("advanced").group.items =
              builder.getGroup("advanced").group.items
                .filter((item) => item.key !== "image")
                .filter((item) => item.key !== "table")
          }
        }
      }
    })

    crepe.editor.use([...atHighlightDirective, atDirectiveNode, atInputRule]);

    return crepe;
  }, []);

  return <Milkdown />;
};

export default function MilkdownEditorWrapper() {
  return (
    <div className="h-96 w-[960px]">
      <MilkdownProvider>
        <MilkdownEditor />
      </MilkdownProvider>
    </div>
  )
};
