import React, { useState } from 'react';
import { LuCopy, LuCheck } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const components = {
    // Headings
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mb-1">{children}</h4>,
    h5: ({ children }) => <h5 className="text-base font-semibold mb-1">{children}</h5>,
    h6: ({ children }) => <h6 className="text-sm font-semibold mb-1">{children}</h6>,

    // Text
    p: ({ children }) => <p className="mb-2">{children}</p>,
    span: ({ children }) => <span>{children}</span>,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    small: ({ children }) => <small className="text-xs">{children}</small>,
    mark: ({ children }) => <mark className="bg-yellow-200">{children}</mark>,

    // Lists
    ul: ({ children }) => <ul className="list-disc pl-6 mb-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-2">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    dl: ({ children }) => <dl className="mb-2">{children}</dl>,
    dt: ({ children }) => <dt className="font-semibold">{children}</dt>,
    dd: ({ children }) => <dd className="ml-4">{children}</dd>,

    // Links
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {children}
      </a>
    ),

    // Images
    img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full h-auto rounded" />,

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="border border-gray-300 border-collapse w-full text-left">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b">{children}</tr>,
    th: ({ children }) => <th className="border border-gray-300 px-3 py-2 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border border-gray-300 px-3 py-2">{children}</td>,
    caption: ({ children }) => <caption className="text-sm text-gray-500">{children}</caption>,

    // Forms
    form: ({ children }) => <form className="space-y-3">{children}</form>,
    label: ({ children }) => <label className="block font-medium">{children}</label>,
    input: (props) => <input {...props} className="border px-2 py-1 rounded w-full" />,
    textarea: (props) => <textarea {...props} className="border px-2 py-1 rounded w-full" />,
    select: (props) => <select {...props} className="border px-2 py-1 rounded w-full" />,
    option: ({ children, ...props }) => <option {...props}>{children}</option>,
    button: ({ children, ...props }) => (
      <button {...props} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        {children}
      </button>
    ),

    // Media
    video: (props) => <video {...props} controls className="max-w-full rounded" />,
    audio: (props) => <audio {...props} controls className="w-full" />,
    iframe: (props) => <iframe {...props} className="w-full rounded" />,

    // Code
    pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded">{children}</pre>,
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative">
          <button
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleCopy(String(children).trim())}
          >
            {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div" {...props}>
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>
          {children}
        </code>
      );
    },

    // Block elements
    div: ({ children }) => <div className="mb-2">{children}</div>,
    section: ({ children }) => <section className="mb-4">{children}</section>,
    article: ({ children }) => <article className="mb-4">{children}</article>,
    header: ({ children }) => <header className="mb-4">{children}</header>,
    footer: ({ children }) => <footer className="mt-4">{children}</footer>,
    aside: ({ children }) => <aside className="mb-4">{children}</aside>,
    main: ({ children }) => <main className="mb-4">{children}</main>,
    nav: ({ children }) => <nav className="mb-4">{children}</nav>,

    // Other
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">{children}</blockquote>
    ),
    hr: () => <hr className="my-4 border-gray-300" />,
    details: ({ children }) => <details className="mb-2">{children}</details>,
    summary: ({ children }) => <summary className="font-semibold cursor-pointer">{children}</summary>,
    figure: ({ children }) => <figure className="mb-2">{children}</figure>,
    figcaption: ({ children }) => <figcaption className="text-sm text-gray-500">{children}</figcaption>,
  };

  return (
    <div className="p-4 bg-white rounded shadow overflow-x-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
