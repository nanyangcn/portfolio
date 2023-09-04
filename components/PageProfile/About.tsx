import React from 'react';

import { profileContent } from 'data/profile';

function About() {
  return (
    <div className="flex h-screen flex-col" id="about">
      <h1 className="text-2xl">About</h1>
      {profileContent.about}
    </div>
  );
}

export default About;
