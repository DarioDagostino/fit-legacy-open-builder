import React, { useEffect, useState } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import '@/lib/integrations/builder'; // Import initialized builder

interface DynamicSectionProps {
  model: string;
}

/**
 * Component to render dynamic content from Builder.io.
 */
export const DynamicSection: React.FC<DynamicSectionProps> = ({ model }) => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      const builderContent = await builder.get(model, {
        userAttributes: {
          urlPath: window.location.pathname,
        },
      }).toPromise();
      setContent(builderContent);
    }
    fetchContent();
  }, [model]);

  if (!content && !builder.editingMode) {
    return null; // Or a loading skeletons
  }

  return (
    <div className="builder-section">
      <BuilderComponent model={model} content={content} />
    </div>
  );
};
