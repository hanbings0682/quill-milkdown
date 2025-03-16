'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import MilkdownEditorWrapper from './milkdown/milkdown'
import QuillEditorWrapper from './quill/quill'

export default function Home() {
  return (
    <>
    <TabGroup>
      <TabList>
        <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 1</Tab>
        <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 2</Tab>
        <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MilkdownEditorWrapper />
        </TabPanel>
        <TabPanel>
          <QuillEditorWrapper/>
        </TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
    </>
  )
}
