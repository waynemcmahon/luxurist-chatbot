# Voiceflow Chat Integration

This directory contains components to integrate the Voiceflow chat widget into your Next.js application as an embedded chat interface.

## Components

### 1. VoiceflowEmbed

The component that implements the Voiceflow chat widget as an embedded chat interface.

```tsx
import { VoiceflowEmbed } from '@/components/VoiceflowChat/VoiceflowEmbed';

// In your component
<VoiceflowEmbed 
  projectId="YOUR_PROJECT_ID"
  className="w-full h-[600px]"
/>
```

### 2. VoiceflowExample

An example component showing how to integrate the embedded chat.

```tsx
import { VoiceflowExample } from '@/components/VoiceflowChat/VoiceflowExample';

// In your component
<VoiceflowExample />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| projectId | string | required | Your Voiceflow project ID |
| apiKey | string | optional | Your Voiceflow API key (optional) |
| width | string | '100%' | Width of the chat container |
| height | string | '600px' | Height of the chat container |
| style | React.CSSProperties | undefined | Additional inline styles |
| className | string | undefined | Additional CSS classes |

## Styling

The component adds custom CSS variables to customize the look and feel of the Voiceflow chat widget:

```css
:root {
  --vf-primary-color: hsla(23, 91.9%, 29.53%, 1); 
  --vf-primary-hover-color: hsla(23, 91.9%, 25%, 1);
  --vf-assistant-bg-color: #f3f4f6;
  --vf-user-bg-color: hsla(23, 91.9%, 29.53%, 1);
  --vf-bubble-border-radius: 2px;
}
```

You can override these variables in your own CSS or modify them in the component.

## Documentation

For more detailed information about the Voiceflow chat widget, refer to the [official Voiceflow documentation](https://docs.voiceflow.com/docs/embed-customize-styling). 