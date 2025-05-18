import DeviconReact from "../assets/icons/DeviconReact.svg"
import DeviconSvelte from "../assets/icons/DeviconSvelte.svg"
import DeviconNextjs from "../assets/icons/DeviconPlainNextjs.svg"
import DeviconReactnative from "../assets/icons/DeviconReactnative.svg"
import SimpleIconsExpo from "../assets/icons/SimpleIconsExpo.svg"
// import Tanstack from "../assets/icons/Tanstack.png"

import aiRecoveryProjectImage from "../assets/projects/ai-recovery.png";
import sophistAIProjectImage from "../assets/projects/sophist-ai.png";
import pChatProjectImage from "../assets/projects/pchat.png";
import aconewsProjectImage from "../assets/projects/aconews.png"

export const CONTENT = {
  hero: {
    sub: "hi i'm shounak ghosh, a",
    main1: "fullstack web dev",
    main2: "+ pro keyboard smasher",
    paragraph1: "i write performant and scalable software. been writing code ever since i got access to a computer back in 2009.",
    paragraph2: "need someone to help you build the next biggest thing? i've got your back.",
    tools: [
      {
        label: "React",
        Icon: DeviconReact,
      },
      // {
      //   label: "Tanstack Tools",
      //   Icon: Tanstack,
      // },
      {
        label: "Svelte",
        Icon: DeviconSvelte,
      },
      {
        label: "Next.js",
        Icon: DeviconNextjs,
      },
      {
        label: "SvelteKit",
        Icon: DeviconSvelte,
      },
      {
        label: "React Native",
        Icon: DeviconReactnative,
      },
      {
        label: "Expo",
        Icon: SimpleIconsExpo,
      },
    ]
  },
  projects: [
    {
      key: "sophist-ai",
      label: "SophistAI",
      image: sophistAIProjectImage,
      link: "https://sophistai.app",
      github: "#",
      description: "Struggling with a messy, multi-page syllabus before exams? SophistAI turns it into a clear, interactive mind map— so you can study smarter, not harder."
    },
    {
      key: "pchat",
      label: "pChat",
      image: pChatProjectImage,
      link: "https://pchat-chi.vercel.app",
      github: "https://github.com/shahank42/pChat/",
      description: "A quick, disposable and decentralized messaging app for the web. Everything is stored in a decentralised database, no servers involved! Everyone using the app stores some part of the database with them, forming a peer-to-peer network."
    },
    {
      key: "aconews",
      label: "aconews",
      image: aconewsProjectImage,
      link: "https://aconews-6e1e1.web.app/",
      github: "https://github.com/shahank42/aconews",
      description: "aconews is a modern news aggregator. It provides users with a seamless experience to stay updated on the latest news across various categories."
    },
    {
      key: "ai-recovery",
      label: "AI-Recovery and High Value Services",
      image: aiRecoveryProjectImage,
      link: "https://ai-recovery.co.in",
      github: "#",
      description: "AI- Recovery & High Value Services is a modern consulting firm which empowers consumers in terms of contributing a small portion in developing a sustainable livelihood."
    },
  ]
}