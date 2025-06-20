import { XIcon } from 'lucide-react'; // Ícone para fechar o modal
import React from 'react';

interface ModalProps {
  isOpen: boolean; // Controla se o modal está visível
  onClose: () => void; // Função para fechar o modal (chamada ao clicar no overlay)
  children: React.ReactNode; // Conteúdo a ser exibido dentro do modal
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[9999]"
      onClick={onClose}
      // Adicionado -webkit-backdrop-filter
      style={{
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // <--- Adicione esta linha
      }}
    >
      <div
        className="bg-gray-800 rounded-lg p-4 max-w-sm w-full m-2 relative"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// --- Subcomponentes do Modal ---

interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void; // Adicionamos a prop onClose aqui
  showCloseButton?: boolean; // Adicionamos a prop para controlar a visibilidade do botão
}

// Componente para o título do modal
export const ModalHeader = ({
  children,
  onClose,
  showCloseButton = true,
}: ModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold text-gray-200">{children}</h2>
      {showCloseButton &&
        onClose && ( // Renderiza o botão apenas se showCloseButton for true e onClose for fornecido
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Fechar modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
    </div>
  );
};

interface ModalDescriptionProps {
  children: React.ReactNode;
}

// Componente para a descrição/subtítulo do modal
export const ModalDescription = ({ children }: ModalDescriptionProps) => {
  return <p className="text-sm text-gray-400 mb-4">{children}</p>;
};

interface ModalContentProps {
  children: React.ReactNode;
}

// Componente para o corpo principal do modal
export const ModalContent = ({ children }: ModalContentProps) => {
  return <div className="text-gray-300">{children}</div>;
};
