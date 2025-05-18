import type { GetImageResult } from "astro";
import { Button, buttonVariants } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { GithubIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CONTENT } from "@/lib/content";

export const ProjectsIsland = ({ projects }: { projects: typeof CONTENT.projects }) => {
  return (
    <Tabs
      orientation="vertical"
      defaultValue={projects[0].key}
      className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_1.618fr] border-x border-input"
    >
      <div className="absolute inset-0 pointer-events-none text-surface-8 hidden md:block"><svg className="absolute -left-[6.5px] -bottom-[6.5px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" vector-effect="non-scaling-stroke"><path d="M6 0V12M0 6H12" stroke="currentColor"></path></svg><svg className="absolute -right-[6.5px] -bottom-[6.5px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" vector-effect="non-scaling-stroke"><path d="M6 0V12M0 6H12" stroke="currentColor"></path></svg></div>

      <TabsList className="flex flex-col w-full bg-transparent p-0">
        {projects.map((project) => (
          <TabsTrigger asChild key={project.key} value={project.key} >
            <Button variant="ghost" size="lg" className="font-inter text-sm lg:text-md justify-start px-8 sm:px-8 lg:px-10 w-full rounded-none cursor-pointer py-3 border-b border-t-0 border-x-0 border-input">
              {project.label}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>

      {projects.map((project) => (
        <TabsContent key={project.key} value={project.key} className="md:border-l border-input">
          <img src={project.image.src} width={project.image.width} height={project.image.height} className="border-b border-input" />
          <div className="flex flex-col">
            <span className="py-3 px-4 font-inter text-sm text-secondary-foreground/75">{project.description}</span>
            <div className="grid grid-cols-2 place-items-center">
              <Button variant="ghost" asChild>
                <a className="h-full py-3 font-inter text-xs w-full rounded-none border-t border-input" href={project.link} target="_blank">Open Link <SquareArrowOutUpRightIcon /></a>
              </Button>

              {project.github === "#" ? (
                <Button variant="ghost" className="h-full py-3 font-inter text-xs w-full rounded-none border-t border-l border-input" disabled>
                  Source Code
                  <GithubIcon />
                </Button>
              ) : (
                <a
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-full py-3 font-inter text-xs w-full rounded-none border-t border-l border-input"
                  )}
                  href={project.github}
                  target="_blank"
                >
                  Source Code
                  <GithubIcon />
                </a>
              )}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}