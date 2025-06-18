interface CardProps {
  children?: React.ReactNode;
}

interface CardHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

interface CardBodyProps {
  children?: React.ReactNode;
}
export const Card = ({ children }: CardProps) => {
  return <div className="bg-gray-800 rounded-lg p-4">{children}</div>;
};

export const CardHeader = ({ title, icon }: CardHeaderProps) => {
  return (
    <div className="flex items-center mb-2">
      {icon && (
        <div className="mr-2 text-white bg-primary-500 p-1 rounded-md">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
      </div>
    </div>
  );
};

export const CardSubtitle = ({ subtitle }: { subtitle?: string }) => {
  return <p className="text-sm text-gray-400">{subtitle || 'Sem subtítulo'}</p>;
};

export const CardBody = ({ children }: CardBodyProps) => {
  return <div className="text-gray-200 mt-4 font-bold">{children}</div>;
};
