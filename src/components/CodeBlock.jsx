import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

// Reusable CodeBlock component
export function CodeBlock({ title = "Code", language = "html", code = "" }) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code || "");
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Copy failed");
        }
    };

    return (
        <div className="mt-6 max-w-3xl mx-auto w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-white/10">
            {/* Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <span>🧩</span>
                    <span>{title}</span>
                </p>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition"
                >
                    <FaRegCopy />
                    Copy
                </button>
            </div>

            {/* Syntax Highlighter */}
            <SyntaxHighlighter
                language={language}
                style={language === "css" ? dark : docco}
                customStyle={{
                    backgroundColor: "#1e1e1e",
                    margin: 0,
                    padding: "1.25rem",
                    fontSize: "0.92rem",
                    lineHeight: "1.6",
                    borderRadius: "0 0 0.75rem 0.75rem",
                    overflowX: "auto",
                }}
                wrapLongLines={true}
                showLineNumbers={true}
            >
                {code || ""}
            </SyntaxHighlighter>
        </div>
    );
}