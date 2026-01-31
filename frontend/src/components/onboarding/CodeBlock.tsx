interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Programming language for syntax context */
  language?: string;
  /** Optional title/filename */
  title?: string;
}

/**
 * Simple code block for displaying code snippets.
 * Uses monospace font with dark background for readability.
 */
export function CodeBlock({ code, language, title }: CodeBlockProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg">
      {title && (
        <div className="bg-base-300 text-body-s text-base-content/70 px-4 py-2">
          {title}
          {language && (
            <span className="text-primary ml-2 text-xs">{language}</span>
          )}
        </div>
      )}
      <pre className="bg-neutral text-neutral-content overflow-x-auto p-4">
        <code className="text-body-s font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
