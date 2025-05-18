import DeviconReact from "../assets/icons/DeviconReact.svg"
import DeviconSvelte from "../assets/icons/DeviconSvelte.svg"
import DeviconNextjs from "../assets/icons/DeviconPlainNextjs.svg"
import DeviconReactnative from "../assets/icons/DeviconReactnative.svg"
import SimpleIconsExpo from "../assets/icons/SimpleIconsExpo.svg"
// import Tanstack from "../assets/icons/Tanstack.png"

import aiRecoveryProjectImage from "../assets/projects/ai-recovery.png";
import sophistAIProjectImage from "../assets/projects/sophist-ai.png";

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
    // {
    //   key: "pchat",
    //   label: "pChat",
    //   image: "#",
    //   link: "https://pchat-chi.vercel.app"
    // },
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