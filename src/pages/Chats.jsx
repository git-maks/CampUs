import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import { doctorImageById, housingImageById } from '../data/assetMaps';
import { getInitialChatThreads, resolveChatThread } from '../data/chats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faStethoscope,
  faBuilding,
  faPaperPlane,
  faCircleCheck,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

function getLastMessage(thread) {
  return thread.messages[thread.messages.length - 1] ?? null;
}

function formatTime(timestamp) {
  if (!timestamp) {
    return '';
  }

  return new Date(timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatThreadTimestamp(timestamp) {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();

  return sameDay
    ? date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function Chats() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [threads, setThreads] = useState(() => getInitialChatThreads());
  const [activeThreadId, setActiveThreadId] = useState(searchParams.get('thread') || null);
  const [draftMessage, setDraftMessage] = useState('');

  const requestedThreadId = searchParams.get('thread');

  useEffect(() => {
    if (!requestedThreadId) {
      setActiveThreadId(null);
      return;
    }

    setThreads((previousThreads) => {
      if (previousThreads.some((thread) => thread.id === requestedThreadId)) {
        return previousThreads;
      }

      const generatedThread = resolveChatThread(requestedThreadId);
      return generatedThread ? [generatedThread, ...previousThreads] : previousThreads;
    });

    setActiveThreadId(requestedThreadId);
  }, [requestedThreadId]);

  useEffect(() => {
    if (!activeThreadId) {
      return;
    }

    setThreads((previousThreads) =>
      previousThreads.map((thread) => {
        if (thread.id !== activeThreadId || thread.unreadCount === 0) {
          return thread;
        }

        return {
          ...thread,
          unreadCount: 0,
        };
      }),
    );
  }, [activeThreadId]);

  const orderedThreads = useMemo(() => {
    return [...threads].sort((leftThread, rightThread) => {
      const leftTimestamp = new Date(getLastMessage(leftThread)?.timestamp ?? 0).getTime();
      const rightTimestamp = new Date(getLastMessage(rightThread)?.timestamp ?? 0).getTime();
      return rightTimestamp - leftTimestamp;
    });
  }, [threads]);

  const unreadMessagesCount = orderedThreads.reduce(
    (total, thread) => total + Math.max(0, Number(thread.unreadCount ?? 0)),
    0,
  );

  const activeThread = activeThreadId ? orderedThreads.find((thread) => thread.id === activeThreadId) ?? null : null;
  const isThreadView = Boolean(activeThreadId);

  const openThread = (threadId) => {
    setSearchParams({ thread: threadId });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = draftMessage.trim();
    if (!trimmedMessage || !activeThread) {
      return;
    }

    const outgoingMessage = {
      id: `${activeThread.id}-${Date.now()}`,
      sender: 'me',
      text: trimmedMessage,
      timestamp: new Date().toISOString(),
    };

    setThreads((previousThreads) =>
      previousThreads.map((thread) => {
        if (thread.id !== activeThread.id) {
          return thread;
        }

        return {
          ...thread,
          messages: [...thread.messages, outgoingMessage],
        };
      }),
    );
    setDraftMessage('');
  };

  const getThreadAvatar = (thread) => {
    if (thread.avatarType === 'doctor') {
      return doctorImageById[thread.avatarId] ?? null;
    }

    if (thread.avatarType === 'housing') {
      return housingImageById[thread.avatarId] ?? null;
    }

    return null;
  };

  const getThreadInitials = (thread) => {
    if (thread.avatarInitials) {
      return thread.avatarInitials;
    }

    return thread.contactName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0])
      .join('')
      .toUpperCase();
  };

  const renderAvatar = (thread, sizeClass, textClass) => {
    const avatarImage = getThreadAvatar(thread);

    if (avatarImage) {
      return (
        <span className={`flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10`}>
          <img src={avatarImage} alt={`${thread.contactName} avatar`} className="h-full w-full object-cover" loading="lazy" />
        </span>
      );
    }

    if (thread.avatarType === 'initials') {
      return (
        <span
          className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-2xl border border-white/20 text-white shadow-[0_8px_18px_rgba(0,0,0,0.25)]`}
          style={{ background: thread.avatarBg ?? 'linear-gradient(135deg, #334155 0%, #64748b 100%)' }}
        >
          <span className={`${textClass} font-semibold uppercase tracking-wide`}>{getThreadInitials(thread)}</span>
        </span>
      );
    }

    return (
      <span className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10`}>
        <FontAwesomeIcon icon={thread.kind === 'doctor' ? faStethoscope : faBuilding} className={textClass} />
      </span>
    );
  };

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faComments} className="accent-text text-base" />
          Chats
        </h1>
        <p className="section-subtitle">
          {isThreadView
            ? 'Tap the top-right messages button to return to your contacts list.'
            : 'Choose a contact to open their conversation.'}
        </p>

        {!isThreadView ? (
          <section className="glass-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-white/62">Chat history</p>
              <span className="accent-chip rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider">
                {unreadMessagesCount} unread message{unreadMessagesCount === 1 ? '' : 's'}
              </span>
            </div>

            <div className="max-h-[66vh] space-y-2 overflow-y-auto pr-1">
              {orderedThreads.map((thread) => {
                const avatarImage = getThreadAvatar(thread);
                const lastMessage = getLastMessage(thread);

                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => openThread(thread.id)}
                    className="w-full rounded-2xl border border-white/14 bg-white/6 px-3 py-2 text-left text-white/84 transition hover:bg-white/12"
                  >
                    <div className="flex items-center gap-3">
                      {renderAvatar(thread, 'h-11 w-11', 'text-xs')}

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="single-line block text-sm font-semibold">{thread.contactName}</span>
                          <span className="text-[0.65rem] uppercase tracking-wide text-white/64">{formatThreadTimestamp(lastMessage?.timestamp)}</span>
                        </span>

                        <span className="single-line mt-1 block text-xs text-white/72">{lastMessage?.text ?? 'No messages yet'}</span>
                      </span>

                      {thread.unreadCount > 0 ? (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[#ffd0ea] bg-[#d31f7a] px-1 text-[0.62rem] font-semibold text-white">
                          {thread.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="glass-panel p-4">
            {activeThread ? (
              <>
                <div className="flex items-center gap-3 border-b border-white/14 pb-3">
                  {renderAvatar(activeThread, 'h-12 w-12', 'text-sm')}

                  <span className="min-w-0 flex-1">
                    <span className="single-line block text-base font-semibold text-white">{activeThread.contactName}</span>
                    <span className="single-line block text-xs text-white/66">{activeThread.subtitle}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-white/16 bg-white/8 px-2 py-1 text-[0.64rem] uppercase tracking-wider text-white/72">
                    <FontAwesomeIcon icon={faClock} className="text-[0.6rem]" />
                    Live
                  </span>
                </div>

                <div className="mt-3 max-h-[52vh] space-y-2 overflow-y-auto pr-1">
                  {activeThread.messages.map((message) => {
                    const isOutgoing = message.sender === 'me';
                    const isSystem = message.sender === 'system';

                    return (
                      <div key={message.id} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[86%] rounded-2xl border px-3 py-2 text-sm leading-relaxed ${
                            isOutgoing
                              ? 'border-[rgba(255,165,214,0.45)] bg-[rgba(173,1,95,0.3)] text-white shadow-[0_8px_18px_rgba(173,1,95,0.28)]'
                              : isSystem
                                ? 'border-[rgba(255,165,214,0.42)] bg-[rgba(173,1,95,0.18)] text-[#ffe0f2]'
                                : 'border-white/14 bg-white/8 text-white/84'
                          }`}
                        >
                          {isSystem ? (
                            <p className="mb-1 inline-flex items-center gap-1 text-[0.64rem] font-semibold uppercase tracking-wide text-[#ffd4eb]">
                              <FontAwesomeIcon icon={faCircleCheck} className="text-[0.6rem]" />
                              Appointment Update
                            </p>
                          ) : null}
                          <p>{message.text}</p>
                          <p className="mt-1 text-right text-[0.62rem] uppercase tracking-wide text-white/58">{formatTime(message.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} className="mt-4 flex items-end gap-2">
                  <textarea
                    value={draftMessage}
                    onChange={(event) => setDraftMessage(event.target.value)}
                    rows={1}
                    placeholder={`Message ${activeThread.contactName}...`}
                    className="frosted-input min-h-[46px] resize-none"
                  />
                  <button type="submit" className="primary-pill inline-flex h-[46px] w-[46px] items-center justify-center">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                  </button>
                </form>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-white/72">This conversation could not be loaded.</p>
                <button type="button" onClick={() => setSearchParams({})} className="ghost-pill px-4 py-2 text-sm">
                  Back to Contacts
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
