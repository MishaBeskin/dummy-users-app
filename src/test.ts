import 'zone.js'; // Import zone.js
import 'zone.js/testing'; // ✅ Required for Angular test environment

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// ✅ This line is what actually loads all your *.spec.ts tests
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
