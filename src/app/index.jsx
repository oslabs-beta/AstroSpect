// render App
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import styles from '../extension/styles.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
