import { Icon } from "@iconify/react/dist/iconify.js";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl"; // Tamaño opcional
  closeOnOverlayClick?: boolean;   // Controla cierre al hacer clic en fondo
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const CustomModal = ({
  open,
  onClose,
  children,
  size = "md",
  closeOnOverlayClick = true,
}: CustomModalProps) => {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full p-5 relative ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro del modal
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center 
             text-gray-500 hover:text-white hover:bg-red-400 transition-colors duration-200"
          aria-label="Cerrar modal"
        >
          <Icon icon="ph:x" className="w-5 h-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default CustomModal;