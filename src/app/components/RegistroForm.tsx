import { motion } from 'motion/react';
import { useState } from 'react';
import videoBackground from '../../imports/Modern_Kids_Craft_Ideas_to_Refresh_Your_Routine_-_Pin-482940760053419111.mp4';

interface RegistroFormProps {
  onVolver: () => void;
}

export function RegistroForm({ onVolver }: RegistroFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.contraseña) {
      setMensaje('Todos los campos son obligatorios');
      setIsSuccess(false);
      return;
    }

    if (formData.contraseña.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres');
      setIsSuccess(false);
      return;
    }

    // Guardar en localStorage (simulación)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar si el email ya existe
    if (usuarios.some((u: any) => u.email === formData.email)) {
      setMensaje('Este email ya está registrado');
      setIsSuccess(false);
      return;
    }

    // Agregar nuevo usuario
    usuarios.push({
      id: Date.now(),
      nombre: formData.nombre,
      email: formData.email,
      contraseña: formData.contraseña,
      fecha: new Date().toISOString()
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    setMensaje('¡Registro exitoso!');
    setIsSuccess(true);
    setFormData({ nombre: '', email: '', contraseña: '' });

    // Volver a la página principal después de 2 segundos
    setTimeout(() => {
      onVolver();
    }, 2000);
  };

  return (
    <div className="size-full relative overflow-hidden flex items-center justify-center">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoBackground} type="video/mp4" />
      </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenedor del formulario con glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: 'rgba(8, 5, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px 32px'
        }}
      >
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-4xl mb-2 w-full text-center"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.02em'
          }}
        >
          REGISTRO
        </motion.h2>

        <p
          className="text-center mb-8 w-full"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px',
            color: '#A3A3C2'
          }}
        >
          Crea tu cuenta y comienza tu camino
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nombre */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              className="block mb-2"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#A3A3C2'
              }}
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
              className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '16px',
                background: 'rgba(15, 12, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F43F5E';
                e.target.style.boxShadow = '0 0 12px rgba(244, 63, 94, 0.4)';
                e.target.style.background = 'rgba(15, 12, 26, 0.75)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(15, 12, 26, 0.6)';
              }}
            />
          </motion.div>

          {/* Campo Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              className="block mb-2"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#A3A3C2'
              }}
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '16px',
                background: 'rgba(15, 12, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F43F5E';
                e.target.style.boxShadow = '0 0 12px rgba(244, 63, 94, 0.4)';
                e.target.style.background = 'rgba(15, 12, 26, 0.75)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(15, 12, 26, 0.6)';
              }}
            />
          </motion.div>

          {/* Campo Contraseña */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              className="block mb-2"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#A3A3C2'
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '16px',
                background: 'rgba(15, 12, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F43F5E';
                e.target.style.boxShadow = '0 0 12px rgba(244, 63, 94, 0.4)';
                e.target.style.background = 'rgba(15, 12, 26, 0.75)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(15, 12, 26, 0.6)';
              }}
            />
          </motion.div>

          {/* Mensajes */}
          {mensaje && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-lg text-center"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '14px',
                background: isSuccess
                  ? 'rgba(34, 197, 94, 0.2)'
                  : 'rgba(244, 63, 94, 0.2)',
                border: isSuccess
                  ? '1px solid rgba(34, 197, 94, 0.5)'
                  : '1px solid rgba(244, 63, 94, 0.5)',
                color: '#FFFFFF'
              }}
            >
              {mensaje}
            </motion.div>
          )}

          {/* Botón Registrarse */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-lg text-white transition-all duration-300"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#0F0C1A',
              border: 'none',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
            }}
          >
            Registrarse
          </motion.button>

          {/* Botón Volver */}
          <motion.button
            type="button"
            onClick={onVolver}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{
              borderColor: 'rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF'
            }}
            className="w-full py-3 rounded-lg transition-all duration-300"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#A3A3C2'
            }}
          >
            ← Volver al inicio
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
