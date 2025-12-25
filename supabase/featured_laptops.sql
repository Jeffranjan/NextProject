-- Add is_featured column to products table
ALTER TABLE public.products 
ADD COLUMN is_featured BOOLEAN DEFAULT false;

-- Create index for faster querying of featured products
CREATE INDEX idx_products_is_featured ON public.products(is_featured);

-- Update RLS policy to allow update of is_featured (already covered by existing policy if it allows update on the table)
-- The existing policy "Products: Everyone can view, only Service Role (Admin) can insert/update/delete" likely covers this via service role.
-- If you access via client with RLS, you might need specific policies, but the current implementation seems to use Service Role or simple RLS.
