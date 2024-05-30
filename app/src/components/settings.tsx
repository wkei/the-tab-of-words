import { useAtom } from 'jotai'
import React, { useState } from 'react'

import {
  levelsAtom,
  metAtom,
  modeAtom,
  romajiAtom,
  switchLevelAtom,
} from '../context/store'
import { Level, Mode } from '../types'
import Checkbox from './checkbox'
import Container from './container'
import FormControl from './form-control'
import LevelBadge from './level-badge'
import Picker from './picker'
import Radio from './radio'

function FormSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-y-6 py-12 md:grid-cols-[140px_1fr]">
      <h2 className="justify-self-start text-xl font-semibold leading-6">
        {title}
      </h2>
      <div className="flex flex-col justify-center">{children}</div>
    </section>
  )
}

function ModeSwitcher() {
  const [metWords, setMetWords] = useAtom(metAtom)
  const [mode, setMode] = useAtom(modeAtom)

  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newMode = e.target.value as Mode
      if (newMode === 'ichigoichie' && metWords.length) {
        const confirmed = confirm(
          'Do you want to reset the data of previous Ichigo Ichie?',
        )
        if (confirmed) {
          setMetWords([])
        }
      }
      setMode(newMode)
    }
  }

  const handleReset = () => {
    const confirmed = confirm('Do you want to reset the data of Ichigo Ichie?')
    if (confirmed) {
      setMetWords([])
    }
  }

  return (
    <FormSection title="Mode">
      <FormControl
        label={
          <>
            <span>Ichigo Ichie</span>
            <div className="col-start-2 flex justify-between text-stone-500">
              <span>
                Words only appear once. (
                <ruby>
                  一<rp>(</rp>
                  <rt>いち</rt>
                  <rp>)</rp>期<rp>(</rp>
                  <rt>ご</rt>
                  <rp>)</rp>一<rp>(</rp>
                  <rt>いち</rt>
                  <rp>)</rp>会<rp>(</rp>
                  <rt>え</rt>
                  <rp>)</rp>
                </ruby>
                )
              </span>
              {mode === 'ichigoichie' && (
                <button
                  className="text-stone-500 underline"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>
          </>
        }
      >
        <Radio
          name="mode"
          value="ichigoichie"
          target={mode}
          onChange={handleChangeMode}
        />
      </FormControl>
      <FormControl
        label={
          <>
            <div>Random</div>
            <div className="col-start-2 text-stone-500">
              Words appear randomly, except for the learned words.
            </div>
          </>
        }
      >
        <Radio
          name="mode"
          value="random"
          target={mode}
          onChange={handleChangeMode}
        />
      </FormControl>
    </FormSection>
  )
}

function Levels() {
  const [levels] = useAtom(levelsAtom)
  const [, switchLevel] = useAtom(switchLevelAtom)
  const countEnabledLevels = levels.filter(({ enabled }) => enabled).length

  return (
    <FormSection title="Levels">
      <div className="mb-2 flex flex-wrap items-start gap-4">
        {levels.map((level) => (
          <Picker
            key={level.level}
            disabled={level.enabled && countEnabledLevels === 1}
            label={`N${level.level}`}
            picked={level.enabled}
            onClick={() => switchLevel(level.level)}
          />
        ))}
      </div>
      <div className="col-start-2 text-stone-500">
        Only words of selected levels appear.
      </div>
    </FormSection>
  )
}

function Options() {
  const [romaji, setRomaji] = useAtom(romajiAtom)

  return (
    <FormSection title="Options">
      <FormControl label="Romaji">
        <Checkbox checked={romaji} onChange={setRomaji} />
      </FormControl>
    </FormSection>
  )
}

function Info() {
  const links = [
    // ['Product Page', ''],
    ['Source Code', 'https://github.com/wkei/the-tab-of-words/tree/main'],
    [
      'Data Source',
      'https://github.com/wkei/jlpt-vocab-api/tree/main/data-source',
    ],
  ]
  return (
    <FormSection title="About">
      <ul className="list-disc text-stone-200">
        {links.map(([label, href]) => (
          <li className="mb-1 last:mb-0" key={href}>
            <a className="link" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </FormSection>
  )
}

export default function Settings() {
  return (
    <Container>
      <h1 className="mb-12 text-3xl font-semibold">Settings</h1>
      <div className="divide-y">
        {/* <ModeSwitcher /> */}

        <Levels />

        <Options />

        <Info />
      </div>
    </Container>
  )
}
