import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private prefix = 'app-storage-';
  private currentIdKey = this.prefix + 'currentId';

  constructor() {
    if (!localStorage.getItem(this.currentIdKey)) {
      localStorage.setItem(this.currentIdKey, '0');
    }
  }

  private generateKey(): string {
    const currentId = parseInt(localStorage.getItem(this.currentIdKey)!, 10);
    const newId = currentId + 1;
    localStorage.setItem(this.currentIdKey, newId.toString());
    return this.prefix + newId;
  }

  addEntry(value: any): string {
    const key = this.generateKey();
    localStorage.setItem(key, JSON.stringify(value));
    return key.replace(this.prefix, '');
  }

  getEntryById(id: string): any {
    const value = localStorage.getItem(this.prefix + id);
    return value ? JSON.parse(value) : null;
  }

  getAllEntries(): any[] {
    const entries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix) && key !== this.currentIdKey) {
        const value = localStorage.getItem(key);
        if (value) {
          entries.push({
            key: key.replace(this.prefix, ''),
            value: JSON.parse(value),
          });
        }
      }
    }
    return entries;
  }

  updateEntry(id: string, newValue: any): boolean {
    const key = this.prefix + id;
    if (localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(newValue));
      return true;
    }
    return false;
  }

  deleteEntry(id: string): boolean {
    const key = this.prefix + id;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  dropStorage() {
    localStorage.clear();
    localStorage.setItem(this.currentIdKey, '0');
  }
  isEmpty(): boolean {
    return Number(localStorage.getItem(this.currentIdKey)) == 0;
  }
}
