"use client"
import React, { useState } from 'react';
import { italianMenuProfile, veganMenuProfile } from '../../data/menuProfiles';
import Menu from '../../components/Menu/Menu';

const MenuSelector: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(italianMenuProfile);

  const handleProfileChange = (profileType: string) => {
    if (profileType === 'italian') {
      setSelectedProfile(italianMenuProfile);
    } else if (profileType === 'vegan') {
      setSelectedProfile(veganMenuProfile);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleProfileChange('italian')}>Menú Italiano</button>
        <button onClick={() => handleProfileChange('vegan')}>Menú Vegano</button>
      </div>
      <Menu config={selectedProfile} />
    </div>
  );
};

export default MenuSelector;
