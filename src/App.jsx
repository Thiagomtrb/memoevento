import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  QrCode,
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import Slideshow from "./Slideshow.jsx";


// --- Mock de eventos (exemplo)
const demoEvents = [
  {
    id: "casamento-ana-joao",
    title: "Casamento Ana & João",
    date: "2025-11-22",
    coverUrl:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home"); // home | event
  const [currentEvent, setCurrentEvent] = useState(null);
  const [gallery, setGallery] = useState([]); // {id,url,type}
  const [showUpload, setShowUpload] = useState(false);
  const [filter, setFilter] = useState("all"); // all | image | video

  // Criar evento fictício (mock)
  const createEvent = () => {
    const newEvent = {
      id: "evento-" + Date.now(),
      title: "Novo Evento",
      date: new Date().toISOString().split("T")[0],
      coverUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    };
    setCurrentEvent(newEvent);
    setCurrentPage("event");
  };

  const openEvent = (event) => {
    setCurrentEvent(event);
    setCurrentPage("event");
  };

  // Upload de fotos e vídeos (client-only)
  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const urls = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
      createdAt: Date.now(),
    }));

    setGallery((prev) => [...urls, ...prev]);
    setShowUpload(false);
  };

  const removeItem = (id) =>
    setGallery((prev) => prev.filter((it) => it.id !== id));

  const filteredGallery = useMemo(() => {
    if (filter === "all") return gallery;
    return gallery.filter((g) => g.type === filter);
  }, [filter, gallery]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Topbar */}
      <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div
            className="font-semibold tracking-tight text-lg cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            MemoEvento
          </div>

          {currentPage === "event" && (
            <button
              onClick={() => setCurrentPage("home")}
              className="text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar
            </button>
          )}
        </div>
      </div>

      {/* ---------------------- HOME ---------------------- */}
      {currentPage === "home" && (
        <div className="mx-auto max-w-5xl px-4 py-10 space-y-12">
          {/* Hero */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Todas as memórias do evento em um só lugar.
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Crie um evento, gere um QR Code e deixe seus convidados
                enviarem fotos e vídeos em segundos. Nada de perder arquivos no WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={createEvent}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 rounded-2xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 shadow-sm"
                >
                  Criar novo evento
                </motion.button>
                <button
                  onClick={() =>
                    openEvent(demoEvents[0])
                  }
                  className="px-5 py-3 rounded-2xl bg-white border border-neutral-200 font-medium hover:bg-neutral-100"
                >
                  Ver demonstração
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <ShieldCheck size={16} />
                Upload sem cadastro • controle do anfitrião • LGPD-friendly (na versão real)
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1520223297779-95bbd1ea79b7?auto=format&fit=crop&w=1600&q=80"
                  alt="Evento"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 border border-neutral-200 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-100">
                  <QrCode size={22} />
                </div>
                <div>
                  <div className="font-medium text-sm">QR instantâneo</div>
                  <div className="text-xs text-neutral-500">
                    Convidados enviam na hora
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Como funciona */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "1. Crie o evento",
                desc: "Defina nome, data e privacidade.",
                icon: <QrCode size={20} />,
              },
              {
                title: "2. Compartilhe o QR",
                desc: "Cole na entrada, mesas ou convites.",
                icon: <UploadCloud size={20} />,
              },
              {
                title: "3. Receba tudo",
                desc: "Fotos e vídeos na galeria do evento.",
                icon: <ImageIcon size={20} />,
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                  {s.icon}
                </div>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-neutral-600 mt-1">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Eventos recentes */}
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-semibold tracking-tight">
                Eventos recentes
              </h3>
              <button
                onClick={createEvent}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                + Novo evento
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {demoEvents.map((ev) => (
                <motion.button
                  key={ev.id}
                  onClick={() => openEvent(ev)}
                  whileHover={{ y: -2 }}
                  className="text-left bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="h-44 bg-neutral-200">
                    <img
                      src={ev.coverUrl}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold">{ev.title}</div>
                    <div className="text-sm text-neutral-500">{ev.date}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- EVENT PAGE ---------------------- */}
      {currentPage === "event" && currentEvent && (
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
          {/* Header evento */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold tracking-tight">
                {currentEvent.title}
              </h2>
              <div className="text-sm text-neutral-500">
                {currentEvent.date} • Álbum colaborativo
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowUpload(true)}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 shadow-sm flex items-center gap-2"
              >
                <UploadCloud size={18} />
                Enviar mídia
              </motion.button>
            </div>
          </div>

          {/* QR + instrução */}
          <div className="grid md:grid-cols-3 gap-4 items-stretch">
            <div className="md:col-span-2 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="text-sm text-neutral-600">
                Peça para os convidados escanearem o QR Code abaixo e enviarem
                fotos e vídeos durante o evento.
              </div>
              <div className="mt-3 text-xs text-neutral-500">
                (No MVP real, este QR aponta para um link único do evento.)
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm text-center flex flex-col items-center justify-center">
              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                <QrCode size={140} />
              </div>
              <div className="mt-2 text-sm font-medium">QR do evento</div>
            </div>
          </div>

          {/* Tabs / Filtros */}
          <div className="flex gap-2">
            {[
              { key: "all", label: "Tudo" },
              { key: "image", label: "Fotos", icon: <ImageIcon size={16} /> },
              { key: "video", label: "Vídeos", icon: <VideoIcon size={16} /> },
            ].map((t) => {
              const active = filter === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={[
                    "px-3 py-2 rounded-xl text-sm font-medium border transition flex items-center gap-2",
                    active
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Galeria */}
          {filteredGallery.length === 0 ? (
            <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-10 text-center text-neutral-500">
              Ainda não há mídias neste evento.
              <div className="mt-2">
                Clique em <strong>Enviar mídia</strong> para adicionar.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative group rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.name || "foto"}
                      className="w-full h-44 md:h-56 object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-44 md:h-56 object-cover"
                      controls
                    />
                  )}

                  {/* overlay premium */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                  {/* delete */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white/90 backdrop-blur border border-neutral-200 rounded-full p-2 hover:bg-white"
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------------- MODAL UPLOAD ---------------------- */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-neutral-200 p-6"
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold tracking-tight">
                  Enviar fotos e vídeos
                </div>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Fechar
                </button>
              </div>

              <label className="block border border-dashed border-neutral-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-neutral-50 transition">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mb-3">
                  <UploadCloud />
                </div>
                <div className="font-medium">
                  Toque para selecionar arquivos
                </div>
                <div className="text-sm text-neutral-500 mt-1">
                  Aceita fotos e vídeos
                </div>

                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>

              <div className="mt-4 text-xs text-neutral-500">
                Dica: incentive os convidados a enviar durante a festa
                para não esquecer depois.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer mini */}
      <div className="py-10 text-center text-xs text-neutral-500">
        MemoEvento • protótipo frontend (sem backend)
      </div>
    </div>
  );
}
