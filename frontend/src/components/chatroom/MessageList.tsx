"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Message, SenderType } from "../../schemas";

interface MessageListProps {
  messages: Message[] | undefined;
}

/**
 * A component that renders a list of messages.
 */
export function MessageList({ messages }: MessageListProps) {
  if (!messages) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex animate-pulse items-start space-x-2">
            <div className="avatar placeholder">
              <div className="bg-neutral w-10 rounded-full"></div>
            </div>
            <div className="flex-1 space-y-2 py-1">
              <div className="bg-neutral h-4 w-1/2 rounded-sm"></div>
              <div className="bg-neutral h-4 w-3/4 rounded-sm"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse space-y-4 space-y-reverse p-4">
      {messages.map((message) => {
        const isUser = message.senderType === SenderType.USER;

        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "flex items-start space-x-2 rounded-lg p-2 shadow-sm",
              {
                "bg-primary text-primary-content flex-row-reverse": isUser,
                "bg-neutral text-neutral-content": !isUser,
              },
            )}
          >
            <div className="max-w-[60%] text-body-m break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                className={clsx("prose max-w-none flex-1", {
                  "text-primary-content": isUser,
                  "text-neutral-content": !isUser,
                })}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
