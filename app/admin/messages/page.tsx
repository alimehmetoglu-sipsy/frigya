'use client';

import { useState, useEffect } from 'react';
import { Mail, User, Calendar, MessageSquare, Trash2, Eye, Reply, Archive, Search, Filter } from 'lucide-react';

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
};

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      subject: 'Rota Hakkında Bilgi',
      message: 'Merhaba, Haziran ayı için rezervasyon yapmak istiyorum. Grup için indirim var mı?',
      date: '2025-09-05',
      status: 'unread'
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      email: 'ayse@example.com',
      subject: 'Konaklama Seçenekleri',
      message: 'Konaklama yerlerinde vegetaryen yemek seçenekleri mevcut mu?',
      date: '2025-09-04',
      status: 'read'
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      subject: 'Rehber Hizmeti',
      message: 'Profesyonel rehber hizmeti almak istiyorum. Fiyat bilgisi alabilir miyim?',
      date: '2025-09-03',
      status: 'replied'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = filterStatus === 'all' || msg.status === filterStatus;
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: number) => {
    if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'read' } : msg
    ));
  };

  const handleArchive = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'archived' } : msg
    ));
  };

  const handleReply = () => {
    if (selectedMessage && replyText.trim()) {
      setMessages(messages.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, status: 'replied' } : msg
      ));
      setShowReplyModal(false);
      setReplyText('');
      alert('Cevap gönderildi!');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      unread: 'bg-blue-100 text-blue-700',
      read: 'bg-gray-100 text-gray-700',
      replied: 'bg-green-100 text-green-700',
      archived: 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      unread: 'Okunmadı',
      read: 'Okundu',
      replied: 'Cevaplandı',
      archived: 'Arşivlendi'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mesajlar</h1>
        <p className="text-gray-600 mt-2">Ziyaretçilerden gelen mesajları buradan yönetebilirsiniz.</p>
      </div>

      {/* Filtreler ve Arama */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Mesajlarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tümü</option>
              <option value="unread">Okunmamış</option>
              <option value="read">Okunmuş</option>
              <option value="replied">Cevaplanmış</option>
              <option value="archived">Arşivlenmiş</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mesaj Listesi */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">
                Gelen Kutusu ({filteredMessages.length})
              </h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    handleMarkAsRead(msg.id);
                  }}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-primary-50' : ''
                  } ${msg.status === 'unread' ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{msg.name}</h3>
                    {getStatusBadge(msg.status)}
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">{msg.subject}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.message}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {msg.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mesaj Detayı */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {selectedMessage.name}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {selectedMessage.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {selectedMessage.date}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(selectedMessage.status)}
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowReplyModal(true)}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Cevapla</span>
                  </button>
                  <button
                    onClick={() => handleArchive(selectedMessage.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Arşivle</span>
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Görüntülemek için bir mesaj seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cevap Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Mesajı Cevapla</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Kime:</strong> {selectedMessage.name} ({selectedMessage.email})
              </p>
              <p className="text-sm text-gray-600">
                <strong>Konu:</strong> Re: {selectedMessage.subject}
              </p>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Cevabınızı yazın..."
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleReply}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}