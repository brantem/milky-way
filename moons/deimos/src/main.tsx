import React from 'react';
import ReactDOM from 'react-dom/client';

import Deimos from './Deimos';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Deimos
      width={400}
      height={400}
      files={[
        {
          key: 'items.json',
          body: '[{"text":"Exercitation ad dolore anim duis pariatur ipsum aute do nostrud irure eiusmod est mollit aute officia.\\n\\n```\\nconst a = 1;\\n```"},{"text":"```\\nconst a = 1;\\n```\\n\\nIpsum dolore ullamco eiusmod officia in aute fugiat nisi excepteur cupidatat elit aliqua laboris."},{"text":"Exercitation velit irure `excepteur` enim aliquip eiusmod veniam do sint **ipsum** pariatur commodo irureesse do."},{"text":"Lorem *ullamco* Lorem ea."}]',
        },
      ]}
      data={{
        file: 'items.json',
      }}
    />
  </React.StrictMode>,
);
