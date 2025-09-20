/*
  # Refresh schema for analysis column

  This migration ensures the analysis column exists and refreshes the schema cache.
  
  1. Verify analysis column exists
  2. Update schema cache by making a small change
*/

-- Ensure the analysis column exists with proper type
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'documents' AND column_name = 'analysis'
  ) THEN
    ALTER TABLE documents ADD COLUMN analysis jsonb NOT NULL DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Force schema refresh by updating a comment
COMMENT ON COLUMN documents.analysis IS 'Document analysis data in JSON format - updated';