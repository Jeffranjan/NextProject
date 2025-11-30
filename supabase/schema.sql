-- Create Products Table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  price numeric not null,
  original_price numeric,
  rating numeric default 0,
  reviews integer default 0,
  specs jsonb,
  image text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Orders Table
create table public.orders (
  id text primary key, -- Razorpay Order ID
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  amount numeric not null,
  currency text default 'INR',
  status text default 'pending', -- pending, paid, shipped, delivered, cancelled
  payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Order Items Table
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null,
  price numeric not null, -- Price at time of purchase
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create Policies

-- Products: Everyone can view, only Service Role (Admin) can insert/update/delete
create policy "Public products are viewable by everyone"
  on public.products for select
  using ( true );

-- Orders: Users can view their own orders (if we had auth), for now Service Role manages all
-- We will rely on Service Role for Order creation and Admin management
-- Public can insert orders (via API which will use Service Role or we allow public insert with checks)
-- Actually, for security, we should probably only allow the backend to insert orders using the Service Role.
-- So we won't add a public insert policy for orders.

