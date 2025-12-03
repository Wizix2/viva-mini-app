"use client";

import React from 'react';
import VivaTheme from '@/styles/theme';

/**
 * This component demonstrates the VIVA AI design system
 * It's a visual showcase of colors, typography, and components
 */
export function VivaThemeDemo() {
  return (
    <div className="space-y-8">
      <section className="viva-card">
        <h2 className="text-title-lg viva-gradient-text mb-6">VIVA Design System</h2>
        <p className="text-body-md text-white/70 mb-4">
          A comprehensive design system for the VIVA AI application featuring glass morphism,
          yellow accents, and a premium dark theme.
        </p>
      </section>

      {/* Color Palette */}
      <section className="viva-card">
        <h3 className="text-title-md mb-4">Color Palette</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSwatch name="Yellow" color="bg-viva-yellow" textColor="text-black" />
          <ColorSwatch name="Yellow Light" color="bg-viva-yellow-light" textColor="text-black" />
          <ColorSwatch name="Yellow Dark" color="bg-viva-yellow-dark" textColor="text-black" />
          <ColorSwatch name="Background" color="bg-viva-bg" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <ColorSwatch name="Surface" color="bg-viva-surface" />
          <ColorSwatch name="Glass" color="bg-viva-glass" />
          <ColorSwatch name="Border" color="bg-viva-border" />
        </div>
      </section>

      {/* Typography */}
      <section className="viva-card">
        <h3 className="text-title-md mb-4">Typography</h3>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-title-xl">Title XL</h1>
            <p className="text-body-sm text-white/50">2.5rem / 700 weight</p>
          </div>
          
          <div>
            <h2 className="text-title-lg">Title LG</h2>
            <p className="text-body-sm text-white/50">2rem / 700 weight</p>
          </div>
          
          <div>
            <h3 className="text-title-md">Title MD</h3>
            <p className="text-body-sm text-white/50">1.5rem / 600 weight</p>
          </div>
          
          <div>
            <h4 className="text-title-sm">Title SM</h4>
            <p className="text-body-sm text-white/50">1.25rem / 600 weight</p>
          </div>
          
          <div>
            <p className="text-body-lg">Body LG - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-body-sm text-white/50">1.125rem / 400 weight</p>
          </div>
          
          <div>
            <p className="text-body-md">Body MD - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-body-sm text-white/50">1rem / 400 weight</p>
          </div>
          
          <div>
            <p className="text-body-sm">Body SM - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-body-sm text-white/50">0.875rem / 400 weight</p>
          </div>
          
          <div>
            <p className="text-body-xs">Body XS - The quick brown fox jumps over the lazy dog.</p>
            <p className="text-body-sm text-white/50">0.75rem / 400 weight</p>
          </div>
        </div>
      </section>

      {/* Glass Morphism */}
      <section className="viva-card">
        <h3 className="text-title-md mb-4">Glass Morphism</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass p-4 h-32 flex items-center justify-center">
            <p className="text-white/80">.glass</p>
          </div>
          
          <div className="glass-heavy p-4 h-32 flex items-center justify-center">
            <p className="text-white/80">.glass-heavy</p>
          </div>
          
          <div className="glass-bordered p-4 h-32 flex items-center justify-center">
            <p className="text-white/80">.glass-bordered</p>
          </div>
          
          <div className="glass glass-hover p-4 h-32 flex items-center justify-center col-span-1 md:col-span-3">
            <p className="text-white/80">.glass-hover (Hover me)</p>
          </div>
        </div>
      </section>

      {/* Component Tokens */}
      <section className="viva-card">
        <h3 className="text-title-md mb-4">Component Tokens</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-body-sm text-white/50">.viva-button</p>
            <button className="viva-button">Primary Button</button>
          </div>
          
          <div className="space-y-2">
            <p className="text-body-sm text-white/50">.viva-button-secondary</p>
            <button className="viva-button-secondary">Secondary Button</button>
          </div>
          
          <div className="space-y-2">
            <p className="text-body-sm text-white/50">.viva-input</p>
            <input 
              type="text" 
              className="viva-input w-full" 
              placeholder="Input field" 
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-body-sm text-white/50">.viva-toolbar</p>
            <div className="viva-toolbar">
              <span>Toolbar Title</span>
              <button className="viva-button-secondary py-1.5 px-3">Action</button>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-body-sm text-white/50">.viva-panel</p>
            <div className="viva-panel">
              <p>Panel Content</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for color swatches
function ColorSwatch({ name, color, textColor = 'text-white' }: { name: string, color: string, textColor?: string }) {
  return (
    <div className={`${color} rounded-viva h-20 flex items-end p-2`}>
      <span className={`${textColor} text-sm font-medium`}>{name}</span>
    </div>
  );
}

export default VivaThemeDemo;
