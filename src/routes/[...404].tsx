import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="text-center mx-auto p-4">
      <h1 class="max-6-xs text-6xl font-thin uppercase my-16">
        Not Found
      </h1>
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>
      </p>
    </main>
  );
}
