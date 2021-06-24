import { KojiBackend } from '@withkoji/core';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

// Import our configuration
import kojiConfig from '../../koji.json';

// Init
const app = express();

// Enable cors for preflight
app.options('*', cors());

// Whitelist all routes with cors
app.use(cors());

// Use express json
app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Use Koji's middleware to handle scoping across your app's customized versions
app.use(KojiBackend.middleware(kojiConfig));

// Disable caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// Add routes here - for example:
app.get('/data', (req, res, next) => {
  const database = new KojiBackend.Database({ res });

  // Look up an item in the items collection
  const item = await database.get('items', 'myItemId');

  res.status(200).json({
    item,
  });
});

// Start server
app.listen(process.env.PORT || 3333, null, async (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('[koji] backend started');
});
