import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type TabType = 'chats' | 'contacts' | 'calls' | 'settings' | 'profile';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  online: boolean;
}

interface Call {
  id: number;
  name: string;
  type: 'audio' | 'video';
  time: string;
  duration: string;
  incoming: boolean;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  type: 'text' | 'image' | 'video' | 'audio';
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Анна Иванова', lastMessage: 'Привет! Как дела?', time: '14:23', unread: 2, avatar: '👩', online: true },
    { id: 2, name: 'Команда проекта', lastMessage: 'Отправил файлы по проекту', time: '13:45', unread: 0, avatar: '👥', online: false },
    { id: 3, name: 'Максим', lastMessage: 'Созвонимся сегодня?', time: '12:10', unread: 5, avatar: '👨', online: true },
    { id: 4, name: 'Мама', lastMessage: 'Не забудь зайти в магазин', time: 'Вчера', unread: 0, avatar: '👩‍🦰', online: false },
  ];

  const contacts: Contact[] = [
    { id: 1, name: 'Анна Иванова', status: 'В сети', avatar: '👩', online: true },
    { id: 2, name: 'Максим', status: 'В сети', avatar: '👨', online: true },
    { id: 3, name: 'Сергей Петров', status: 'Был(а) 2 часа назад', avatar: '👨‍💼', online: false },
    { id: 4, name: 'Елена', status: 'Был(а) вчера', avatar: '👩‍💻', online: false },
    { id: 5, name: 'Мама', status: 'Был(а) 5 минут назад', avatar: '👩‍🦰', online: false },
  ];

  const calls: Call[] = [
    { id: 1, name: 'Анна Иванова', type: 'video', time: 'Сегодня, 14:00', duration: '12:34', incoming: true, avatar: '👩' },
    { id: 2, name: 'Максим', type: 'audio', time: 'Сегодня, 11:20', duration: '05:12', incoming: false, avatar: '👨' },
    { id: 3, name: 'Команда проекта', type: 'video', time: 'Вчера, 18:30', duration: '45:00', incoming: true, avatar: '👥' },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', time: '14:20', isMine: false, type: 'text' },
    { id: 2, text: 'Отлично! Работаю над новым проектом', time: '14:21', isMine: true, type: 'text' },
    { id: 3, text: 'Звучит интересно! Расскажешь?', time: '14:22', isMine: false, type: 'text' },
    { id: 4, text: 'Конечно! Это мессенджер с современным дизайном', time: '14:23', isMine: true, type: 'text' },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  const renderChats = () => (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <Input 
          placeholder="🔍 Поиск чатов..." 
          className="w-full bg-muted/50 border-none"
        />
      </div>
      <ScrollArea className="flex-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={`p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors border-b ${
              selectedChat === chat.id ? 'bg-primary/10' : ''
            }`}
          >
            <div className="relative">
              <Avatar className="w-12 h-12 text-2xl">
                <AvatarFallback>{chat.avatar}</AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <Badge className="bg-primary text-primary-foreground">{chat.unread}</Badge>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  const renderContacts = () => (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <Input 
          placeholder="🔍 Поиск контактов..." 
          className="w-full bg-muted/50 border-none"
        />
      </div>
      <ScrollArea className="flex-1">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors border-b"
          >
            <div className="relative">
              <Avatar className="w-12 h-12 text-2xl">
                <AvatarFallback>{contact.avatar}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{contact.name}</h3>
              <p className="text-xs text-muted-foreground">{contact.status}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Icon name="Phone" size={16} />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Icon name="Video" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  const renderCalls = () => (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">История звонков</h2>
      </div>
      <ScrollArea className="flex-1">
        {calls.map((call) => (
          <div
            key={call.id}
            className="p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors border-b"
          >
            <Avatar className="w-12 h-12 text-2xl">
              <AvatarFallback>{call.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{call.name}</h3>
                <Icon 
                  name={call.incoming ? 'PhoneIncoming' : 'PhoneOutgoing'} 
                  size={14} 
                  className={call.incoming ? 'text-green-500' : 'text-blue-500'}
                />
              </div>
              <p className="text-xs text-muted-foreground">{call.time} • {call.duration}</p>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={16} />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32 text-6xl">
            <AvatarFallback>👤</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Иван Петров</h2>
            <p className="text-muted-foreground">@ivan_petrov</p>
            <Badge className="mt-2 bg-green-500">В сети</Badge>
          </div>
        </div>
        
        <div className="space-y-3 bg-card rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Телефон</span>
            <span className="font-medium">+7 (999) 123-45-67</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="font-medium">ivan@example.com</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm text-muted-foreground">Дата регистрации</span>
            <span className="font-medium">15 января 2024</span>
          </div>
        </div>
        
        <Button className="w-full" size="lg">
          <Icon name="Edit" size={18} className="mr-2" />
          Редактировать профиль
        </Button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="flex-1 p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Настройки</h2>
      <div className="space-y-4 max-w-2xl">
        {[
          { icon: 'Bell', title: 'Уведомления', desc: 'Настройка звуков и оповещений' },
          { icon: 'Lock', title: 'Приватность', desc: 'Кто может видеть ваш профиль' },
          { icon: 'Palette', title: 'Оформление', desc: 'Темы и цветовые схемы' },
          { icon: 'Globe', title: 'Язык', desc: 'Русский' },
          { icon: 'HardDrive', title: 'Хранилище', desc: 'Управление файлами и медиа' },
          { icon: 'Shield', title: 'Безопасность', desc: 'Двухфакторная аутентификация' },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-card rounded-2xl hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={item.icon as any} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatWindow = () => {
    const currentChat = chats.find(c => c.id === selectedChat);
    if (!currentChat) return null;

    return (
      <div className="flex-1 flex flex-col animate-slide-in-right">
        <div className="p-4 border-b bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              size="icon" 
              variant="ghost" 
              className="lg:hidden"
              onClick={() => setSelectedChat(null)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <Avatar className="w-10 h-10 text-xl">
              <AvatarFallback>{currentChat.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{currentChat.name}</h3>
              <p className="text-xs text-muted-foreground">
                {currentChat.online ? 'В сети' : 'Был(а) недавно'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Icon name="Phone" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="Video" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 bg-muted/20">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-scale-in`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.isMine
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-card'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-xs ${msg.isMine ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-card">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="Image" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="Mic" size={20} />
            </Button>
            <Input
              placeholder="Написать сообщение..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="rounded-full" size="icon">
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <div className="w-20 bg-card border-r flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl shadow-lg">
          💬
        </div>
        
        <nav className="flex-1 flex flex-col gap-4">
          {[
            { icon: 'MessageSquare', tab: 'chats' as TabType },
            { icon: 'Users', tab: 'contacts' as TabType },
            { icon: 'Phone', tab: 'calls' as TabType },
            { icon: 'User', tab: 'profile' as TabType },
            { icon: 'Settings', tab: 'settings' as TabType },
          ].map((item) => (
            <Button
              key={item.tab}
              size="icon"
              variant={activeTab === item.tab ? 'default' : 'ghost'}
              onClick={() => {
                setActiveTab(item.tab);
                setSelectedChat(null);
              }}
              className={`w-12 h-12 rounded-2xl transition-all ${
                activeTab === item.tab 
                  ? 'bg-gradient-to-br from-primary to-secondary shadow-lg' 
                  : 'hover:bg-muted'
              }`}
            >
              <Icon name={item.icon as any} size={22} />
            </Button>
          ))}
        </nav>
      </div>

      <div className={`${selectedChat && activeTab === 'chats' ? 'hidden lg:flex' : 'flex'} w-full lg:w-96 border-r bg-background flex-col`}>
        {activeTab === 'chats' && renderChats()}
        {activeTab === 'contacts' && renderContacts()}
        {activeTab === 'calls' && renderCalls()}
      </div>

      {selectedChat && activeTab === 'chats' ? (
        renderChatWindow()
      ) : activeTab === 'profile' ? (
        renderProfile()
      ) : activeTab === 'settings' ? (
        renderSettings()
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/20">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Выберите чат
            </h2>
            <p className="text-muted-foreground">
              Начните общение с друзьями и коллегами
            </p>
          </div>
        </div>
      )}
    </div>
  );
}