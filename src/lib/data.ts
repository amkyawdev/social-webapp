/**
 * Data Manager - JSONL File-based Data Storage
 * Reads/writes data to JSONL files in the data/ directory
 * @module lib/data
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

/**
 * Read all records from a JSONL file
 * @function readData
 * @param {string} filename - JSONL filename
 * @returns {any[]} Array of records
 */
export function readData(filename: string): any[] {
  const filePath = path.join(DATA_DIR, filename)
  
  if (!fs.existsSync(filePath)) {
    return []
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  if (!content.trim()) return []
  
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line))
}

/**
 * Write all records to a JSONL file
 * @function writeData
 * @param {string} filename - JSONL filename
 * @param {any[]} data - Array of records to write
 */
export function writeData(filename: string, data: any[]): void {
  const filePath = path.join(DATA_DIR, filename)
  const content = data.map(item => JSON.stringify(item)).join('\n')
  fs.writeFileSync(filePath, content + '\n')
}

/**
 * Append a record to a JSONL file
 * @function appendData
 * @param {string} filename - JSONL filename
 * @param {any} record - Record to append
 */
export function appendData(filename: string, record: any): void {
  const filePath = path.join(DATA_DIR, filename)
  fs.appendFileSync(filePath, JSON.stringify(record) + '\n')
}

// User functions
export function getUsers() {
  return readData('users.jsonl')
}

export function getUserById(id: string) {
  const users = getUsers()
  return users.find(u => u.id === id)
}

export function addUser(user: any) {
  appendData('users.jsonl', user)
}

// Post functions
export function getPosts() {
  return readData('posts.jsonl')
}

export function addPost(post: any) {
  const posts = getPosts()
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
  appendData('posts.jsonl', { ...post, id: newId })
}

// Group functions
export function getGroups() {
  return readData('groups.jsonl')
}

export function addGroup(group: any) {
  const groups = getGroups()
  const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1
  appendData('groups.jsonl', { ...group, id: newId })
}