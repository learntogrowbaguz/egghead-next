import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = `https://${process.env.RESOURCE_NOTES_DATABASE_ID}.supabase.co`
const SUPABASE_KEY = process.env.SUPABASE_KEY
const supabase = SUPABASE_KEY && createClient(SUPABASE_URL, SUPABASE_KEY)

export const loadUserNotesForResource = async (
  contactId: string,
  lessonSlug: string,
) => {
  // all notes for the specific user
  // all public notes
  if (supabase) {
    const {data, error} = await supabase
      .from(process.env.RESOURCE_NOTES_TABLE_NAME || 'resource_notes')
      .select()
      .eq('resource_id', lessonSlug)
      .or(`state.eq.published${contactId ? `,user_id.eq.${contactId}` : ``}`)
    return {data, error}
  } else {
    return {data: [], error: 'no supabase'}
  }
}
