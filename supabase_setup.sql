-- 1. Create the PC Parts table
create table if not exists pc_parts (
  id text primary key,
  category text not null,
  title text not null,
  branch text not null,
  price numeric not null,
  image text not null,
  specs jsonb not null,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security (Security Policy)
alter table pc_parts enable row level security;

-- 3. Create a policy to allow everyone to READ the parts
-- (This fixes the issue where data is not visible)
create policy "Public parts are viewable by everyone"
  on pc_parts for select
  using ( true );

-- 4. Create a policy to allow authenticated users (Admins) to EDIT parts
create policy "Admins can manage parts"
  on pc_parts for all
  using ( auth.role() = 'authenticated' ); 
