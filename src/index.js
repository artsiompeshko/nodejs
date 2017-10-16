import 'babel-polyfill';
import dirwatcherEmitter from './modules/dirwatcherEmitter';
import DIRWATCHER_EVENTS from './constants/events/dirwatcher.events';
import { Dirwatcher, Importer } from './modules';
import streams from './utils/streams';

// const dirwatcher = new Dirwatcher();
// dirwatcher.watch('./data', 5000);
//
// const importer = new Importer();
//
// dirwatcherEmitter.on(DIRWATCHER_EVENTS.CHANGED, () => {
//   const data = importer.importSync('./data');
//
//   console.log('SYNC', data);
// });
//
// dirwatcherEmitter.on(DIRWATCHER_EVENTS.CHANGED, async () => {
//   const data = await importer.import('./data');
//
//   console.log('ASYNC', data);
// });

streams.inputOutput(process.stdin, process.stdout);
