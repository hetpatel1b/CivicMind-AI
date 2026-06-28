'use client';

import React from 'react';
import { DemoProvider } from '../context/DemoProvider';
import DemoApp from '../components/DemoApp';

export default function CitizenDemoPage() {
  return (
    <DemoProvider initialRole="citizen">
      <DemoApp />
    </DemoProvider>
  );
}
