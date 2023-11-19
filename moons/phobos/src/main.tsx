import React from 'react';
import ReactDOM from 'react-dom/client';

import Phobos from './Phobos';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Phobos
      width={400}
      files={[
        {
          key: 'text.md',
          body: 'Elit voluptate [](color://#d946ef) culpa consequat labore id fugiat ea consectetur laborum occaecat exercitation. Do culpa laborum dolore qui exercitation ea dolor qui ullamco veniam veniam. Nostrud consectetur ad aliqua culpa labore pariatur ut cupidatat est culpa nisi. Irure labore magna non cupidatat Lorem laboris ad dolor Lorem excepteur nisi anim nostrud laborum cillum. Velit do officia dolore eiusmod Lorem velit velit tempor Lorem cillum pariatur eiusmod voluptate dolore officia. Ipsum ullamco voluptate ad deserunt ipsum deserunt ex adipisicing minim magna exercitation in velit. Amet ea excepteur ut. Eu laboris labore ea voluptate excepteur laboris qui id non minim ex.\n\nSint proident amet veniam Lorem sint culpa nostrud ex excepteur cupidatat nostrud minim. Enim duis deserunt esse. Cupidatat consequat dolore id minim officia excepteur ad elit sunt. Laborum enim veniam eiusmod voluptate id irure cillum Lorem veniam tempor. Tempor nisi laborum minim et esse nulla velit labore occaecat irure excepteur quis in reprehenderit. Do cupidatat aliqua exercitation cillum minim nostrud id veniam Lorem anim ea.\n\nPariatur amet consectetur do ea id consequat. Sunt consequat pariatur aliqua pariatur. Sit adipisicing fugiat exercitation aliqua ipsum commodo nisi anim. Nisi ex enim adipisicing labore. Velit incididunt proident cupidatat amet officia. Ipsum do duis dolore incididunt aute est in ut enim reprehenderit commodo quis aliqua elit. Proident veniam duis nulla qui cillum irure minim Lorem Lorem veniam dolore voluptate aute. Non culpa minim sint ea deserunt dolore ut aute incididunt proident Lorem nostrud tempor.\n\nMinim nisi excepteur aliqua nulla elit proident sit Lorem. Consequat proident esse reprehenderit mollit veniam voluptate. Est mollit irure cillum amet aute est est. Laborum ad amet aliquip sit labore do do ea. Esse quis aliquip in incididunt aute dolor sunt culpa dolore consequat adipisicing. Adipisicing do mollit esse laborum eiusmod. Do eiusmod culpa ea sit.\n\nNisi eiusmod sint irure deserunt est laborum. Incididunt amet esse dolore cillum cillum labore. Aute et laborum eu officia excepteur laborum fugiat adipisicing. Lorem magna ea ex nulla duis labore mollit in id duis velit irure. Ipsum veniam velit id non veniam dolore sit reprehenderit consectetur tempor amet. Consequat minim reprehenderit eiusmod ad in.',
        },
      ]}
      data={{
        file: 'text.md',
      }}
      onPublish={(action, data) => console.log(action, data)}
    />
  </React.StrictMode>,
);
