'use client';
import { useEffect } from 'react';
import { registerSW } from '@/lib/swClient';

export default function RegisterSW() {
  useEffect(() => { registerSW(); }, []);
  return null;
}
