import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  GitMerge,
  GitBranchPlus,
  GitPullRequestDraft,
  Github,
  AlertCircle,
  Activity,
} from "lucide-react";

// --- Helper Components & Icons ---

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// --- Helper Components & Icons ---

// A generic icon wrapper using lucide-react props
const Icon = ({ icon: IconComponent }: { icon: React.ElementType }) => (
  <div className="text-secondary-foreground w-4 h-4 flex-shrink-0 mt-0.5">
    <IconComponent size={16} strokeWidth={1.5} />
  </div>
);

type GithubEvent = {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  created_at: string;
};

type EventProps = {
  icon: React.ElementType;
  children: ReactNode;
};

// --- Event Parsers ---

// A generic component to display an event
const Event = ({ icon, children }: EventProps) => (
  <div className="flex items-start gap-2">
    <Icon icon={icon} />
    <div className="flex flex-col gap-0.5 w-full overflow-hidden">
      {children}
    </div>
  </div>
);

// Parses and displays a PushEvent (commits)
const PushEvent = ({ event }: { event: GithubEvent }) => {
  const commitCount = event.payload.commits.length;
  const commitOrCommits = commitCount === 1 ? "commit" : "commits";
  const repoName = event.repo.name;
  const repoUrl = `https://github.com/${repoName}`;

  return (
    <Event icon={GitMerge}>
      <p className="text-surface-foreground/75 text-xs truncate">
        pushed {commitCount} {commitOrCommits} to{" "}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
        >
          {repoName}
        </a>
      </p>
      <ul className="text-secondary-foreground text-xs list-none pl-0">
        {event.payload.commits.slice(0, 1).map((commit: any) => (
          <li key={commit.sha} className="truncate flex items-center gap-2">
            <a
              href={`https://github.com/${repoName}/commit/${commit.sha}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono hover:underline"
            >
              {commit.sha.slice(0, 7)}
            </a>
            <span>{commit.message}</span>
          </li>
        ))}
      </ul>
    </Event>
  );
};

// Parses and displays a CreateEvent (new branch or repo)
const CreateEvent = ({ event }: { event: GithubEvent }) => {
  const { ref_type, ref } = event.payload;
    const repoName = event.repo.name;
    const repoUrl = `https://github.com/${repoName}`;

  if (ref_type === "branch") {
    return (
      <Event icon={GitBranchPlus}>
        <div className="text-surface-foreground/75 text-xs truncate wrap-normal">
          created new branch{" "}
          <span className="font-mono text-xs text-secondary-foreground bg-surface-8 px-1 py-0.5 rounded">
            {ref}
          </span>{" "}
          <br className="block sm:hidden" />
          in{" "}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
          >
            {repoName}
          </a>
        </div>
      </Event>
    );
  }
  if (ref_type === "repository") {
    return (
      <Event icon={Github}>
        <p className="text-surface-foreground/75 text-xs truncate">
          created new repository{" "}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
          >
            {repoName}
          </a>
        </p>
      </Event>
    );
  }
  return null;
};

// Parses and displays a PullRequestEvent
const PullRequestEvent = ({ event }: { event: GithubEvent }) => {
  const { action, pull_request } = event.payload;
  const isMerged = action === "closed" && pull_request.merged;
  const actionText = isMerged ? "merged" : action;
  const icon = isMerged ? GitMerge : GitPullRequestDraft;
  const repoName = event.repo.name;

  if (action !== "opened" && !isMerged) return null;

  return (
    <Event icon={icon}>
      <p className="text-surface-foreground/75 text-xs truncate">
        {actionText} pull request{" "}
        <a
          href={pull_request.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
        >
          #{pull_request.number}
        </a>{" "}
        in{" "}
        <a
          href={`https://github.com/${repoName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
        >
          {repoName}
        </a>
      </p>
      <p className="text-secondary-foreground/75 text-xs truncate">
        {pull_request.title}
      </p>
    </Event>
  );
};

// Parses and displays an IssuesEvent
const IssuesEvent = ({ event }: { event: GithubEvent }) => {
  const { action, issue } = event.payload;
  const repoName = event.repo.name;
  if (action === "opened") {
    return (
      <Event icon={AlertCircle}>
        <p className="text-surface-foreground text-xs truncate">
          opened issue{" "}
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
          >
            #{issue.number}
          </a>{" "}
          in{" "}
          <a
            href={`https://github.com/${repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-surface-foreground hover:text-muted-foreground transition-colors"
          >
            {repoName}
          </a>
        </p>
        <p className="text-secondary-foreground text-xs truncate">
          {issue.title}
        </p>
      </Event>
    );
  }
  return null;
};

// --- Main Component ---

const GithubActivity = ({ username = "shahank42" }) => {
  const [activity, setActivity] = useState<GithubEvent[]>([]); // Added explicit type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added explicit type

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch activity: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter and map in one go for slight optimization
        const filteredActivity = data
          .filter((event: any) =>
            [
              "PushEvent",
              "CreateEvent",
              "PullRequestEvent",
              "IssuesEvent",
            ].includes(event.type),
          )
          .slice(0, 5);
        setActivity(filteredActivity);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchActivity();
    }
  }, [username]);

  // MOVED a helper function inside the component that uses it.
  const renderEvent = (event: GithubEvent) => {
    switch (event.type) {
      case "PushEvent":
        return <PushEvent key={event.id} event={event} />;
      case "CreateEvent":
        return <CreateEvent key={event.id} event={event} />;
      case "PullRequestEvent":
        return <PullRequestEvent key={event.id} event={event} />;
      case "IssuesEvent":
        return <IssuesEvent key={event.id} event={event} />;
      default:
        return null;
    }
  };

  // MOVED the return statement inside the component body.
  return (
    <Card className="flex w-full font-inter text-secondary-foreground/50 rounded-none border-none bg-background">
      {/* <CardHeader>
        <CardTitle className="flex items-center gap-2"> 
          <Activity size={18} strokeWidth={1.5} />
          Recent Activity
        </CardTitle>
      </CardHeader> */}
      <CardContent>
      <div className="flex flex-col gap-4"> {/* Added a wrapper with spacing */}
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="w-4 h-4 rounded-full mt-0.5" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        {error && <p className="text-red-500 text-xs">Error: {error}</p>}
        {!loading && !error && activity.length > 0 && activity.map(renderEvent)}
        {!loading && !error && activity.length === 0 && (
          <p className="text-muted-foreground text-xs">
            No recent public activity to display.
          </p>
        )}
        </div>
      </CardContent>
    </Card>
  );
}; // This is now the correct closing brace for the component.

export default GithubActivity;