import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  QrCode,
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
  Lock,
  Download,
} from "lucide-react";

// --- Mock de eventos (para exemplo)
const demoEvents = [
  {
    id: "casamento-ana-joao",
    title: "Casamento Ana & João",
    date: "2025-11-22",
    coverUrl:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80",
  },
];

// --- Componente principal ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentEvent, setCurrentEvent] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  // Criar evento fictício (mock)
  const createEvent = () => {
    const newEvent = {
      id: "evento-" + Date.now(),
      title: "Novo Evento",
      date: new Date().toISOString().split("T")[0],
      coverUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    };
    setCurrentEvent(newEvent);
    setCurrentPage("event");
  };

  // Abrir evento existente
  const openEvent = (event) => {
    setCurrentEvent(event);
    setCurrentPage("event");
  };

  // Upload de fotos e vídeos
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setGallery((prev) => [...prev, ...urls]);
    setShowUpload(false);
  };

  // Remover item da galeria
  const removeItem = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  // Layout das páginas
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">

      {/* ---------------------- HOME PAGE ---------------------- */}
      {currentPage === "home" && (
        <div className="text-center space-y-8">
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            MemoEvento
          </motion.h1>

          <p className="text-neutral-400 text-lg">
            Crie eventos, compartilhe fotos e vídeos via QR Code.
          </p>

          {/* Botão Criar Evento */}
          <motion.button
            onClick={createEvent}
            className="bg-green-500 px-6 py-3 text-lg rounded-xl font-semibold hover:bg-green-600"
            whileTap={{ scale: 0.95 }}
          >
            Criar novo evento
          </motion.button>

          {/* Eventos existentes (mock) */}
          <div className="mt-10">
            <h3 className="text-xl mb-4 font-semibold text-neutral-300">
              Eventos recentes
            </h3>

            <div className="grid gap-5">
              {demoEvents.map((ev) => (
                <motion.div
                  key={ev.id}
                  onClick={() => openEvent(ev)}
                  className="cursor-pointer bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:ring-2 ring-green-500"
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={ev.coverUrl} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <h4 className="text-xl font-bold">{ev.title}</h4>
                    <p className="text-neutral-400">{ev.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- EVENT PAGE ---------------------- */}
      {currentPage === "event" && currentEvent && (
        <div className="space-y-6">
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentEvent.title}
          </motion.h2>

          {/* QR CODE FAKE */}
          <div className="bg-neutral-900 p-6 rounded-xl text-center">
            <QrCode size={180} className="mx-auto mb-3" />
            <p className="text-neutral-400">
              Compartilhe este QR Code com os convidados
            </p>
          </div>

          {/* Botão de Upload */}
          <motion.button
            onClick={() => setShowUpload(true)}
            className="bg-green-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
            whileTap={{ scale: 0.95 }}
          >
            <UploadCloud /> Enviar fotos/vídeos
          </motion.button>

          {/* Galeria */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {gallery.map((item) => (
              <motion.div
                key={item.id}
                className="relative group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    className="rounded-xl w-full h-40 object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="rounded-xl w-full h-40 object-cover"
                    controls
                  />
                )}

                {/* Botão de remover */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-80 hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------- MODAL DE UPLOAD ---------------------- */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-neutral-900 p-8 rounded-2xl w-full max-w-md space-y-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-bold text-center mb-4">
                Enviar arquivos
              </h3>

              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleUpload}
                className="bg-neutral-800 w-full p-4 rounded-xl cursor-pointer"
              />

              <button
                onClick={() => setShowUpload(false)}
                className="bg-red-600 mt-4 w-full py-2 rounded-xl font-semibold"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
