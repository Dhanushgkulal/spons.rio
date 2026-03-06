'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageThread } from '@/lib/types';
import { MessageCircle, Search, Send } from 'lucide-react';

export default function MessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Mock threads data
  useEffect(() => {
    const mockThreads: MessageThread[] = [
      {
        id: 'thread_1',
        participantIds: ['user_1', 'user_2'],
        eventId: 'event_1',
        lastMessage: {
          id: 'msg_1',
          threadId: 'thread_1',
          senderId: 'user_2',
          content: 'Sounds great! We can do the booth + speaking slot.',
          timestamp: new Date(),
          attachments: [],
        },
        lastMessageAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 'thread_2',
        participantIds: ['user_1', 'user_3'],
        eventId: 'event_2',
        lastMessage: {
          id: 'msg_2',
          threadId: 'thread_2',
          senderId: 'user_1',
          content: 'Thank you for the proposal! We are reviewing it.',
          timestamp: new Date(Date.now() - 3600000),
          attachments: [],
        },
        lastMessageAt: new Date(Date.now() - 3600000),
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        id: 'thread_3',
        participantIds: ['user_1', 'user_4'],
        eventId: 'event_3',
        lastMessage: {
          id: 'msg_3',
          threadId: 'thread_3',
          senderId: 'user_4',
          content: 'Can we negotiate the price?',
          timestamp: new Date(Date.now() - 172800000),
          attachments: [],
        },
        lastMessageAt: new Date(Date.now() - 172800000),
        createdAt: new Date(Date.now() - 259200000),
      },
    ];
    setThreads(mockThreads);
  }, []);

  const filteredThreads = threads.filter((t) =>
    t.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedThreadId) return;

    // In a real app, this would send the message to a backend
    const thread = threads.find((t) => t.id === selectedThreadId);
    if (thread) {
      thread.lastMessage = {
        id: `msg_${Date.now()}`,
        threadId: selectedThreadId,
        senderId: user?.id || 'user_1',
        content: messageText,
        timestamp: new Date(),
        attachments: [],
      };
      thread.lastMessageAt = new Date();
      setThreads([...threads]);
      setMessageText('');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Thread List */}
      <div className="w-80 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-surface border-border text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No conversations</div>
          ) : (
            filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThreadId(thread.id)}
                className={`w-full p-4 border-b border-border text-left transition-colors ${
                  selectedThreadId === thread.id
                    ? 'bg-surface border-l-2 border-l-accent'
                    : 'hover:bg-surface/50'
                }`}
              >
                <p className="font-medium text-foreground truncate">
                  {thread.eventId || 'Unknown Event'}
                </p>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {thread.lastMessage?.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {thread.lastMessageAt.toLocaleString()}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground">
              Event ID: {selectedThread.eventId}
            </h3>
            <p className="text-sm text-muted-foreground">
              Started {new Date(selectedThread.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Mock messages */}
            {[
              {
                sender: 'Organizer',
                content: 'Hi! Thank you for your sponsorship proposal for TechConf 2024.',
                time: '10:30 AM',
                isOwn: false,
              },
              {
                sender: 'You',
                content: 'Thank you! We are very interested in this event. Can we discuss the available benefits?',
                time: '10:35 AM',
                isOwn: true,
              },
              {
                sender: 'Organizer',
                content: 'Absolutely! We have several sponsorship tiers available. Which tier interests you most?',
                time: '10:40 AM',
                isOwn: false,
              },
            ].map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isOwn
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-surface text-foreground'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="text-xs font-semibold opacity-75 mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-60 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="bg-surface border-border text-foreground placeholder-muted-foreground"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-secondary hover:bg-yellow-600 text-secondary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
