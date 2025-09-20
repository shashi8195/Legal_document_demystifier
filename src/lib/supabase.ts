import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Document {
  id: string
  user_id?: string
  name: string
  type: string
  size: number
  upload_date: string
  content: string
  analysis: any
  language: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  preferred_language: string
  created_at: string
  updated_at: string
}

// Database functions
export const saveDocument = async (document: Omit<Document, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('documents')
    .insert([document])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getUserDocuments = async (userId?: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('id, user_id, name, type, size, upload_date, content, language, created_at, updated_at')
    .eq('user_id', userId || null)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  // Add empty analysis object for compatibility
  return data.map(doc => ({ ...doc, analysis: {} }))
}

export const updateUserLanguage = async (userId: string, language: string) => {
  const { data, error } = await supabase
    .from('users')
    .upsert([{ id: userId, preferred_language: language }])
    .select()
    .single()
  
  if (error) throw error
  return data
}