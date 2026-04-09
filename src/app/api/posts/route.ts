/**
 * Posts API Route
 * Handles POST requests to add new posts to JSONL file
 * @module app/api/posts/route
 */

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const POSTS_FILE = path.join(DATA_DIR, 'posts.jsonl')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Read existing posts
    let posts: any[] = []
    if (fs.existsSync(POSTS_FILE)) {
      const content = fs.readFileSync(POSTS_FILE, 'utf-8')
      if (content.trim()) {
        posts = content.split('\n').filter(line => line.trim()).map(line => JSON.parse(line))
      }
    }

    // Generate new ID
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1

    // Create new post
    const newPost = {
      id: newId,
      title: title.substring(0, 100),
      content: content,
      user_id: 'anonymous', // Could get from session
      created_at: new Date().toISOString()
    }

    // Append to file
    fs.appendFileSync(POSTS_FILE, JSON.stringify(newPost) + '\n')

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}