import { Component, lazy, Suspense } from "react";
import Reveal from "../components/ui/Reveal";
import { person } from "../data/profile";
import "./Activity.css";

const GitHubCalendar = lazy(() =>
  import("react-github-calendar").then((m) => ({ default: m.GitHubCalendar }))
);

/** If the contributions API fails, hide the block rather than show an error. */
class HideOnError extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Real contribution data from GitHub, fetched at runtime. */
export default function Activity() {
  return (
    <HideOnError>
      <Reveal className="container activity">
        <div className="activity__head">
          <h3 className="activity__title mono">GitHub activity · last 12 months</h3>
          <a className="activity__link mono" href={person.links.github} target="_blank" rel="noopener noreferrer">
            @adi0193 ↗
          </a>
        </div>
        <div className="activity__calendar">
          <Suspense fallback={<div className="activity__placeholder" />}>
            <GitHubCalendar
              username="adi0193"
              throwOnError
              colorScheme="dark"
              theme={{ dark: ["#1d1d19", "#ff5b2e"] }}
              blockSize={11}
              blockMargin={4}
              blockRadius={2}
              fontSize={12}
            />
          </Suspense>
        </div>
      </Reveal>
    </HideOnError>
  );
}
