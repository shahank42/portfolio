import type { GetImageResult } from "astro";
import { Button, buttonVariants } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { GithubIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CONTENT } from "@/lib/content";
import { useState } from "react";

type Project = (typeof CONTENT.projects)[0];

export const ProjectsIsland = ({
  projects,
}: {
  projects: typeof CONTENT.projects;
}) => {
  const [tab, setTab] = useState(projects[0].key);

  // Group projects by type
  const groupedProjects = projects.reduce(
    (acc: Record<string, Project[]>, project: Project) => {
      const type = project.type || "Other"; // Default to "Other" if type is not defined
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(project);
      return acc;
    },
    {} as Record<string, Project[]>,
  );

  return (
    <Tabs
      orientation="vertical"
      defaultValue={projects[0].key}
      value={tab}
      onValueChange={setTab}
      className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_1.618fr] border-x border-input"
    >
      <div className="absolute inset-0 pointer-events-none text-surface-8 hidden md:block">
        <svg
          className="absolute -left-[6.5px] -bottom-[6.5px]"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          vector-effect="non-scaling-stroke"
        >
          <path d="M6 0V12M0 6H12" stroke="currentColor"></path>
        </svg>
        <svg
          className="absolute -right-[6.5px] -bottom-[6.5px]"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          vector-effect="non-scaling-stroke"
        >
          <path d="M6 0V12M0 6H12" stroke="currentColor"></path>
        </svg>
      </div>

      <TabsList className="flex flex-col w-full bg-transparent p-0">
        {Object.entries(groupedProjects).map(([type, projectsInType]) => (
          <div key={type} className="w-full">
            <div className="flex sticky top-0 z-10 px-0  py-0 text-sm md:text-xs font-semibold text-secondary-foreground/90 lowercase bg-background text-left md:text-right border-b border-input border-l-0">
              <div className="w-[100%] h-8 border-gutter-edge [--color:var(--color-gutter-edge)]/40  bg-[image:repeating-linear-gradient(315deg,_var(--color)_0,_var(--color)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed">
                <div className="border-x border-input w-full h-full max-w-5xl mx-auto"></div>
              </div>

              <span className="w-48 whitespace-nowrap px-7 h-8 flex items-center">
                {type}
              </span>

              <div className="w-[38.1%] h-8 border-gutter-edge [--color:var(--color-gutter-edge)]/40  bg-[image:repeating-linear-gradient(315deg,_var(--color)_0,_var(--color)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed border-r-0">
                <div className="border-x border-input w-full h-full max-w-5xl mx-auto"></div>
              </div>
            </div>
            {projectsInType.map((project: Project) => (
              <TabsTrigger asChild key={project.key} value={project.key}>
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn("font-inter text-sm lg:text-md flex relative justify-start px-8 sm:px-8 lg:px-10 w-full rounded-none cursor-pointer py-3.5 border-b border-t-0 border-x-0 border-input transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]", {
                    "border-accent border-l-4": tab === project.key,
                  })}
                >
                  {project.label}
                </Button>
              </TabsTrigger>
            ))}
          </div>
        ))}
      </TabsList>

      {projects.map((project: Project) => (
        <TabsContent
          key={project.key}
          value={project.key}
          className="md:border-l border-input"
        >
          <img
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            className="border-b border-input"
          />
          <div className="flex flex-col">
            <span className="py-3 px-4 font-inter text-sm text-secondary-foreground/75">
              {project.description}
            </span>
            <div className="grid grid-cols-2 place-items-center">
              <Button variant="ghost" asChild>
                <a
                  className="h-full py-3 font-inter text-xs w-full rounded-none border-t border-r border-input"
                  href={project.link}
                  target="_blank"
                >
                  Open Link <SquareArrowOutUpRightIcon />
                </a>
              </Button>

              {project.github === "#" ? (
                <Button
                  variant="ghost"
                  className="h-full py-3 font-inter text-xs w-full rounded-none border-t border-input"
                  disabled
                >
                  Source Code
                  <GithubIcon />
                </Button>
              ) : (
                <a
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-full py-3 font-inter text-xs w-full rounded-none border-t border-input",
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
  );
};
