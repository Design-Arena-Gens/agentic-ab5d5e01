"use client";

import { useMemo, useState } from "react";
import {
  generateBlueprint,
  Scene,
  SceneVisual,
  ViralVideoBlueprint,
  VoiceProfile,
} from "@/lib/story-engine";

const STARTER_IDEA =
  "Create a superhero story where a father saves his family from a swirling storm of forgotten memories.";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/70 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl transition hover:border-white/20 dark:bg-slate-900/70">
      <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        <span className="text-2xl leading-none text-purple-500">✦</span>
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}

function SectionList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 rounded-lg bg-white/40 p-3 dark:bg-white/5">
          <span className="mt-0.5 text-lg text-purple-500">•</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function renderScene(scene: Scene) {
  return (
    <div
      key={scene.id}
      className="rounded-2xl bg-gradient-to-br from-white via-white/60 to-purple-50 p-4 ring-1 ring-white/60 dark:from-slate-900 dark:via-slate-900/60 dark:to-purple-950/30 dark:ring-slate-800"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
        <span>{scene.timestamp}</span>
        <span>{scene.duration}</span>
      </div>
      <h4 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
        {scene.title}
      </h4>
      <p className="mt-1 text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
        Emotional tone: {scene.emotionalTone} · Pacing: {scene.pacing}
      </p>
      <div className="mt-3 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Key Beats
        </p>
        <ul className="space-y-1 text-sm">
          {scene.beats.map((beat, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500/70" />
              <span>{beat}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Dialogue
        </p>
        <div className="space-y-2 text-sm">
          {scene.dialogue.map((line, idx) => (
            <p
              key={idx}
              className="rounded-lg bg-purple-500/5 p-2 text-slate-800 dark:bg-purple-400/10 dark:text-slate-200"
            >
              <span className="font-semibold text-purple-600 dark:text-purple-300">
                {line.speaker}:
              </span>{" "}
              {line.line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderVisual(scene: SceneVisual) {
  return (
    <div
      key={scene.sceneId}
      className="rounded-2xl border border-purple-200/40 bg-white/70 p-4 shadow-inner dark:border-purple-900/40 dark:bg-slate-900/70"
    >
      <h4 className="text-base font-semibold text-slate-900 dark:text-white">
        {scene.title}
      </h4>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-purple-500">
            Character Appearance
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {scene.characterAppearance}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-purple-500">
            Camera
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">{scene.camera}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-purple-500">
            Lighting
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {scene.lighting}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-purple-500">
            Environment
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {scene.environment}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-widest text-purple-500">
            Action
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">{scene.action}</dd>
        </div>
      </dl>
    </div>
  );
}

function renderVoice(profile: VoiceProfile) {
  return (
    <div
      key={profile.character}
      className="rounded-2xl border border-purple-100 bg-white/80 p-4 dark:border-purple-900/50 dark:bg-slate-900/70"
    >
      <h4 className="text-base font-semibold text-slate-900 dark:text-white">
        {profile.character}
      </h4>
      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex items-start gap-2">
          <dt className="min-w-[90px] text-xs font-semibold uppercase tracking-widest text-purple-500">
            Gender
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {profile.gender}
          </dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="min-w-[90px] text-xs font-semibold uppercase tracking-widest text-purple-500">
            Age Tone
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {profile.ageTone}
          </dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="min-w-[90px] text-xs font-semibold uppercase tracking-widest text-purple-500">
            Emotion
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">
            {profile.emotionPalette}
          </dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="min-w-[90px] text-xs font-semibold uppercase tracking-widest text-purple-500">
            Style
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">{profile.style}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="min-w-[90px] text-xs font-semibold uppercase tracking-widest text-purple-500">
            Tempo
          </dt>
          <dd className="text-slate-700 dark:text-slate-300">{profile.tempo}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function Home() {
  const [idea, setIdea] = useState(STARTER_IDEA);
  const [submittedIdea, setSubmittedIdea] = useState(STARTER_IDEA);

  const blueprint = useMemo<ViralVideoBlueprint>(
    () => generateBlueprint(submittedIdea),
    [submittedIdea]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-12 text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16">
        <header className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-purple-200">
                Viral YouTube Studio OS
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">
                15-Minute Viral Kids & Family Video Architect
              </h1>
              <p className="mt-3 max-w-2xl text-base text-purple-100">
                Feed the agent a raw idea. Receive a Hollywood-level roadmap
                engineered for algorithmic lift-off, emotional retention, and
                monetization compliance—ready for AI production pipelines.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-purple-400/20 p-4 text-xs uppercase tracking-[0.4em] text-white">
              Ready in 3.2 seconds ⚡
            </div>
          </div>
          <form
            className="mt-6 grid gap-4 lg:grid-cols-[1fr_minmax(0,200px)]"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmittedIdea(idea.trim() || STARTER_IDEA);
            }}
          >
            <label className="sr-only" htmlFor="idea">
              Story Idea
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Drop your raw idea here. Example: “Create a superhero story where a father saves his family.”"
              className="h-36 w-full rounded-2xl border border-white/20 bg-black/30 p-5 text-base leading-relaxed text-white shadow-inner outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-500/40"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-2xl bg-white/90 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-white"
            >
              Generate Blueprint
            </button>
          </form>
        </header>

        <Section title="🎯 1. Viral Video Strategy">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
                Target Audience Age
              </p>
              <p className="mt-2 text-base font-semibold">
                {blueprint.strategy.targetAudience}
              </p>
            </div>
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
                Emotional Triggers Used
              </p>
              <SectionList items={blueprint.strategy.emotionalTriggers} />
            </div>
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
                Retention Strategy
              </p>
              <SectionList items={blueprint.strategy.retentionStrategy} />
            </div>
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
                Why This Will Trend
              </p>
              <SectionList items={blueprint.strategy.trendingReasons} />
            </div>
          </div>
        </Section>

        <Section title="🎬 2. Full Cinematic Script (15 MIN)">
          <div className="space-y-6">
            {blueprint.script.map((act) => (
              <div
                key={act.title}
                className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl dark:border-white/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-purple-300">
                    {act.title}
                  </h3>
                  <div className="rounded-full bg-purple-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-100">
                    Start {act.startTime}
                  </div>
                </div>
                <p className="text-sm text-purple-100">
                  Focus: <span className="font-semibold">{act.focus}</span>
                </p>
                <div className="grid gap-4 lg:grid-cols-3">{act.scenes.map(renderScene)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="🎥 3. Scene-by-Scene Visual Prompts">
          <div className="grid gap-4 md:grid-cols-2">
            {blueprint.visuals.map(renderVisual)}
          </div>
        </Section>

        <Section title="🗣️ 4. Character Voice Design">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blueprint.voices.map(renderVoice)}
          </div>
        </Section>

        <Section title="🔊 5. Sound Design (100% Copyright-Free)">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-purple-200/40 bg-purple-100/40 p-4 text-slate-800 shadow-inner dark:border-purple-900/40 dark:bg-purple-900/40 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Ambient
              </h4>
              <SectionList items={blueprint.sound.ambient} />
            </div>
            <div className="rounded-2xl border border-purple-200/40 bg-purple-100/40 p-4 text-slate-800 shadow-inner dark:border-purple-900/40 dark:bg-purple-900/40 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Action Effects
              </h4>
              <SectionList items={blueprint.sound.effects} />
            </div>
            <div className="rounded-2xl border border-purple-200/40 bg-purple-100/40 p-4 text-slate-800 shadow-inner dark:border-purple-900/40 dark:bg-purple-900/40 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Music Direction
              </h4>
              <SectionList items={blueprint.sound.music} />
            </div>
          </div>
        </Section>

        <Section title="⚡ 6. Viral Retention Boosters">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Hook Lines
              </h4>
              <SectionList items={blueprint.retentionBoosters.hookLines} />
            </div>
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Suspense Moments
              </h4>
              <SectionList items={blueprint.retentionBoosters.suspenseMoments} />
            </div>
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Emotional Dialogues
              </h4>
              <SectionList items={blueprint.retentionBoosters.emotionalDialogues} />
            </div>
            <div className="rounded-2xl bg-white/50 p-4 text-slate-800 shadow dark:bg-white/10 dark:text-slate-100">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Open Loops
              </h4>
              <SectionList items={blueprint.retentionBoosters.openLoops} />
            </div>
          </div>
        </Section>

        <Section title="💰 7. Monetization Optimization">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-purple-200/40 bg-white/70 p-4 dark:border-white/10 dark:bg-white/10">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Ad-Safe Timing
              </h4>
              <p className="mt-2 text-slate-700 dark:text-slate-200">
                {blueprint.monetization.adSafeIntro}
              </p>
            </div>
            <div className="rounded-2xl border border-purple-200/40 bg-white/70 p-4 dark:border-white/10 dark:bg-white/10">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                Mid-Roll Placement Points
              </h4>
              <ul className="mt-2 space-y-2 text-slate-700 dark:text-slate-200">
                {blueprint.monetization.midRollMoments.map((moment) => (
                  <li key={moment.time} className="rounded-lg bg-purple-100/40 p-3 dark:bg-purple-900/30">
                    <span className="font-semibold">{moment.time}</span> —{" "}
                    {moment.context}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-purple-200/40 bg-white/70 p-4 dark:border-white/10 dark:bg-white/10">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-200">
                  Child-Safe Compliance
                </h4>
                <SectionList items={blueprint.monetization.compliance} />
              </div>
            </div>
          </div>
        </Section>

        <Section title="🚫 8. Copyright Safety Rules">
          <SectionList items={blueprint.copyright} />
        </Section>
      </main>
    </div>
  );
}
