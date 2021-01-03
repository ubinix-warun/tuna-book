import { TunaRecord, ledger } from './model';

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;
  
export function addTuna(vessel: string, location: string, holder: string): void {
  const record = new TunaRecord(vessel, location, holder);
  ledger.push(record);
}

export function getTunas(): TunaRecord[] {
  const numTunas = min(MESSAGE_LIMIT, ledger.length);
  const startIndex = ledger.length - numTunas;
  const result = new Array<TunaRecord>(numTunas);
  for(let i = 0; i < numTunas; i++) {
    result[i] = ledger[i + startIndex];
  }
  return result;
}