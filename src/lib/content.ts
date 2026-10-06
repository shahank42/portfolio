import DeviconReact from "../assets/icons/DeviconReact.svg";
import DeviconSvelte from "../assets/icons/DeviconSvelte.svg";
import DeviconNextjs from "../assets/icons/DeviconPlainNextjs.svg";
// import Tanstack from "../assets/icons/Tanstack.png"
import Hono from "../assets/icons/Hono.svg";
import Postgres from "../assets/icons/Postgres.svg";
import Typescript from "../assets/icons/Typescript.svg";

import aiRecoveryProjectImage from "../assets/projects/ai-recovery.png";
import sophistAIProjectImage from "../assets/projects/sophist-ai.png";
import pChatProjectImage from "../assets/projects/pchat.png";
import aconewsProjectImage from "../assets/projects/aconews.png";
import TextPilotProjectImage from "../assets/projects/text-pilot.png";

export const CONTENT = {
  hero: {
    sub: "hi i'm shahank42, a",
    main1: "fullstack web dev",
    main2: "+\npro keyboard smasher",
    paragraph1:
      "i write performant and scalable software. been writing code ever since i got access to a computer back in 2009.",
    paragraph2:
      "need someone to help you build the next biggest thing? i've got your back.",
    tools: [
      {
        label: "Typescript",
        Icon: Typescript,
      },
      {
        label: "React",
        Icon: DeviconReact,
      },
      // {
      //   label: "Tanstack Tools",
      //   Icon: Tanstack,
      // },
      {
        label: "Svelte/SvelteKit",
        Icon: DeviconSvelte,
      },
      {
        label: "Next.js",
        Icon: DeviconNextjs,
      },
      {
        label: "Hono",
        Icon: Hono,
      },
      {
        label: "PostgreSQL",
        Icon: Postgres,
      },
    ],
  },
  hire: {
    pitch: [
      {
        title: "performance first",
        description:
          "i build lightning-fast applications that don't just work—they fly. optimized for core web vitals and user experience.",
      },
      {
        title: "modern stack",
        description:
          "leveraging the latest tech like tanstack, next.js, astro, react 19, sveltekit, convex, etc. and python to build scalable, maintainable software for the future.",
      },
      {
        title: "pixel perfect",
        description:
          "meticulous attention to detail in design implementation. your vision, translated perfectly into code.",
      },
    ],
    basePrices: {
      static: 15000,
      dynamic: 40000,
      ecommerce: 65000,
    },
    pagePrice: 3000,
    featurePrices: {
      auth: 10000,
      payments: 15000,
      cms: 12000,
      seo: 5000,
      responsive: 8000,
    },
  },
  projects: [
    {
      key: "textpilot",
      label: "TextPilot",
      image: TextPilotProjectImage,
      link: "#",
      github: "https://github.com/shahank42/textpilot/",
      description:
        "TextPilot is a self-hostable and soon installable WhatsApp client with an AI Co-pilot!",
      type: "side project",
    },
    {
      key: "sophist-ai",
      label: "SophistAI",
      image: sophistAIProjectImage,
      link: "https://sophistai.app",
      github: "#",
      description:
        "Struggling with a messy, multi-page syllabus before exams? SophistAI turns it into a clear, interactive mind map— so you can study smarter, not harder. 10k+ views, 700+ users.",
      type: "hackathon",
    },
    {
      key: "pchat",
      label: "pChat",
      image: pChatProjectImage,
      link: "https://pchat-chi.vercel.app",
      github: "https://github.com/shahank42/pChat/",
      description:
        "A quick, disposable and decentralized messaging app for the web. Everything is stored in a decentralised database, no servers involved! Everyone using the app stores some part of the database with them, forming a peer-to-peer network.",
      type: "side project",
    },
    {
      key: "aconews",
      label: "aconews",
      image: aconewsProjectImage,
      link: "https://aconews-6e1e1.web.app/",
      github: "https://github.com/shahank42/aconews",
      description:
        "aconews is a modern news aggregator. It provides users with a seamless experience to stay updated on the latest news across various categories.",
      type: "side project",
    },
    {
      key: "ai-recovery",
      label: "AI-Recovery and High Value Services",
      image: aiRecoveryProjectImage,
      link: "https://ai-recovery.co.in",
      github: "#",
      description:
        "AI- Recovery & High Value Services is a modern consulting firm which empowers consumers in terms of contributing a small portion in developing a sustainable livelihood.",
      type: "freelance",
    },
  ],
};
