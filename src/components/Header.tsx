
import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="explora-container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-explora-primary" />
          <div>
            <h1 className="text-2xl font-bold gradient-text">Explora</h1>
            <p className="text-xs text-muted-foreground">Viaje de Exploración de Carreras</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
