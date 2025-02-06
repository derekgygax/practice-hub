import { useDroppable } from "@dnd-kit/core";

interface DroppableContainerProps {
  id: string;
  children: React.ReactNode
  className: string;
}

export const DroppableContainer = ({ id, children, className }: DroppableContainerProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
};
