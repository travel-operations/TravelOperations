-- ============================================================
--  Travel Operations  –  Supabase Schema (Secure)
--  Run this ONCE in your Supabase SQL Editor
--  Project: npdsqwkvjmfajybcmsgb
-- ============================================================


-- ── 1. TABLES ──────────────────────────────────────────────

create table if not exists hero_slides (
  id           uuid        default gen_random_uuid() primary key,
  eyebrow      text        not null default '',
  title        text        not null default '',
  title_accent text        default '',
  description  text        default '',
  btn_text     text        default '',
  href         text        default '/tours',
  image        text        default '',
  order_index  integer     default 0,
  is_active    boolean     default true,
  created_at   timestamptz default now()
);

create table if not exists tour_cards (
  id           uuid        default gen_random_uuid() primary key,
  code         text        default '',
  country      text        not null default '',
  title        text        not null default '',
  price        text        default '',
  image        text        default '',
  duration     text        default '',
  rating       numeric     default 4.8,
  reviews      integer     default 0,
  badge        text        default '',
  featured     boolean     default false,
  category     text        default 'asia',
  order_index  integer     default 0,
  created_at   timestamptz default now()
);

create table if not exists visa_cards (
  id           uuid        default gen_random_uuid() primary key,
  code         text        default '',
  name         text        not null default '',
  image        text        default '',
  price        text        default '',
  type         text        default '',
  processing   text        default '',
  validity     text        default '',
  success      text        default '',
  is_featured  boolean     default false,
  order_index  integer     default 0,
  created_at   timestamptz default now()
);

create table if not exists visa_countries (
  id           uuid        default gen_random_uuid() primary key,
  code         text        default '',
  name         text        not null default '',
  price        text        default '',
  order_index  integer     default 0,
  created_at   timestamptz default now()
);

create table if not exists blog_posts (
  id           uuid        default gen_random_uuid() primary key,
  slug         text        unique not null,
  title        text        not null default '',
  date         text        default '',
  category     text        default '',
  author       text        default '',
  image        text        default '',
  excerpt      text        default '',
  content      text        default '',
  created_at   timestamptz default now()
);

create table if not exists popular_tours (
  id           uuid        default gen_random_uuid() primary key,
  code         text        default '',
  country      text        not null default '',
  title        text        not null default '',
  price        text        default '',
  image        text        default '',
  duration     text        default '',
  location     text        default '',
  rating       numeric     default 4.8,
  group_size   integer     default 12,
  badge        text        default '',
  featured     boolean     default false,
  row          integer     default 1,
  order_index  integer     default 0,
  created_at   timestamptz default now()
);

create table if not exists home_visa_cards (
  id           uuid        default gen_random_uuid() primary key,
  country      text        not null default '',
  code         text        default '',
  type         text        default '',
  processing   text        default '',
  success      text        default '',
  image        text        default '',
  order_index  integer     default 0,
  created_at   timestamptz default now()
);

create table if not exists umrah_packages (
  id           uuid        default gen_random_uuid() primary key,
  tier         text        not null default '',
  title        text        not null default '',
  price        text        default '',
  image        text        default '',
  nights       text        default '',
  hotel        text        default '',
  rating       numeric     default 4.8,
  popular      boolean     default false,
  order_index  integer     default 0,
  created_at   timestamptz default now()
);


-- ── 2. ROW LEVEL SECURITY (public read / auth write) ───────

alter table hero_slides      enable row level security;
alter table tour_cards       enable row level security;
alter table visa_cards       enable row level security;
alter table visa_countries   enable row level security;
alter table blog_posts       enable row level security;
alter table umrah_packages   enable row level security;
alter table popular_tours    enable row level security;
alter table home_visa_cards  enable row level security;

drop policy if exists "public_all"  on hero_slides;
drop policy if exists "public_all"  on tour_cards;
drop policy if exists "public_all"  on visa_cards;
drop policy if exists "public_all"  on visa_countries;
drop policy if exists "public_all"  on blog_posts;
drop policy if exists "public_all"  on umrah_packages;
drop policy if exists "public_all"  on popular_tours;
drop policy if exists "public_all"  on home_visa_cards;
drop policy if exists "public_read" on hero_slides;
drop policy if exists "public_read" on tour_cards;
drop policy if exists "public_read" on visa_cards;
drop policy if exists "public_read" on visa_countries;
drop policy if exists "public_read" on blog_posts;
drop policy if exists "public_read" on umrah_packages;
drop policy if exists "public_read" on popular_tours;
drop policy if exists "public_read" on home_visa_cards;
drop policy if exists "auth_write"  on hero_slides;
drop policy if exists "auth_write"  on tour_cards;
drop policy if exists "auth_write"  on visa_cards;
drop policy if exists "auth_write"  on visa_countries;
drop policy if exists "auth_write"  on blog_posts;
drop policy if exists "auth_write"  on umrah_packages;
drop policy if exists "auth_write"  on popular_tours;
drop policy if exists "auth_write"  on home_visa_cards;

-- Anyone can read (public website)
create policy "public_read" on hero_slides     for select using (true);
create policy "public_read" on tour_cards      for select using (true);
create policy "public_read" on visa_cards      for select using (true);
create policy "public_read" on visa_countries  for select using (true);
create policy "public_read" on blog_posts      for select using (true);
create policy "public_read" on umrah_packages  for select using (true);
create policy "public_read" on popular_tours   for select using (true);
create policy "public_read" on home_visa_cards for select using (true);

-- Only logged-in admin can insert / update / delete
create policy "auth_write" on hero_slides     for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on tour_cards      for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on visa_cards      for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on visa_countries  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on blog_posts      for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on umrah_packages  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on popular_tours   for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth_write" on home_visa_cards for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');


-- ── 3. STORAGE BUCKET ──────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('travel-images', 'travel-images', true)
on conflict (id) do update set public = true;

drop policy if exists "travel_images_select" on storage.objects;
drop policy if exists "travel_images_insert" on storage.objects;
drop policy if exists "travel_images_update" on storage.objects;
drop policy if exists "travel_images_delete" on storage.objects;

-- Public can view uploaded images
create policy "travel_images_select" on storage.objects
  for select using (bucket_id = 'travel-images');

-- Only authenticated admin can upload / replace / delete
create policy "travel_images_insert" on storage.objects
  for insert with check (bucket_id = 'travel-images' and auth.role() = 'authenticated');

create policy "travel_images_update" on storage.objects
  for update using (bucket_id = 'travel-images' and auth.role() = 'authenticated');

create policy "travel_images_delete" on storage.objects
  for delete using (bucket_id = 'travel-images' and auth.role() = 'authenticated');


-- ── 4. ADMIN USER SETUP ────────────────────────────────────

DO $$
DECLARE v_uid uuid;
BEGIN
  SELECT id INTO v_uid FROM auth.users WHERE email = 'info@traveloperations.pk';
  IF v_uid IS NOT NULL THEN
    UPDATE auth.users SET
      email_confirmed_at = NOW(),
      encrypted_password = crypt('Travel123-operation', gen_salt('bf')),
      updated_at = NOW(),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb
    WHERE id = v_uid;
  ELSE
    v_uid := gen_random_uuid();
    INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
    VALUES ('00000000-0000-0000-0000-000000000000',v_uid,'authenticated','authenticated','info@traveloperations.pk',crypt('Travel123-operation',gen_salt('bf')),NOW(),'{"provider":"email","providers":["email"]}','{}',NOW(),NOW());
    INSERT INTO auth.identities (id,user_id,identity_data,provider,provider_id,last_sign_in_at,created_at,updated_at)
    VALUES (gen_random_uuid(),v_uid,jsonb_build_object('sub',v_uid::text,'email','info@traveloperations.pk','email_verified',true),'email','info@traveloperations.pk',NOW(),NOW(),NOW());
  END IF;
END $$;


-- ── 5. SEED DATA ───────────────────────────────────────────

insert into hero_slides (eyebrow, title, title_accent, description, btn_text, href, image, order_index, is_active) values
('Featured · Uzbekistan Airways direct',
 'Uzbekistan,', 'along the Silk Road.',
 'Tashkent, Samarkand & Bukhara across 8 nights — direct Uzbekistan Airways flights, 4-star boutique stays, daily breakfast and a private driver-guide. Our most-loved journey of the year.',
 'Explore Uzbekistan', '/tours', '/images/uzbekistan-hero.jpg', 1, true),
('Discover Azerbaijan',
 '7 Days in Baku', 'and beyond.',
 'Explore the vibrant streets of Baku, the ancient charm of Sheki, the natural beauty of Gabala, and the unique landscapes of Gobustan.',
 'View itinerary', '/tours', '/images/azerbaijan-hero.jpg', 2, true),
('Adventure · 6 Nights',
 'Explore', 'Tajikistan.',
 'Journey through the majestic Pamir Mountains, crystal-clear alpine lakes, and the vibrant culture of Dushanbe.',
 'Explore tour', '/tours', '/images/tajikistan-hero.jpg', 3, true),
('Luxury Escape · 5 Nights',
 'Thailand,', 'reimagined.',
 'Private transfers, five-star resorts, tropical islands, vibrant nightlife across Bangkok, Phuket, and Krabi.',
 'Plan this trip', '/tours', '/images/thailand-hero.jpg', 4, true)
on conflict do nothing;

insert into tour_cards (code,country,title,price,image,duration,rating,reviews,badge,featured,category,order_index) values
('UZ','Uzbekistan','Tashkent, Samarkand & Bukhara','280,000','/images/tour4.jpg','8 days · 7 nights',4.8,174,'Featured',true,'asia',1),
('TH','Thailand','Bangkok & Pattaya | Premium','195,000','/images/tour1.jpg','5 days · 4 nights',4.9,213,'Best seller',false,'asia',2),
('MY','Malaysia','Kuala Lumpur & Genting','185,000','/images/tour2.jpg','5 days · 4 nights',4.7,156,'Family',false,'asia',3),
('LK','Sri Lanka','Colombo & Kandy Heritage','175,000','/images/tour3.jpg','6 days · 5 nights',4.6,98,'Honeymoon',false,'asia',4),
('VN','Vietnam','Ha Long Bay Adventure','230,000','/images/tour6.jpg','6 days · 5 nights',4.7,87,'Adventure',false,'asia',5),
('SG','Singapore','Modern City Escape','210,000','/images/tour1.jpg','4 days · 3 nights',4.8,119,'City break',false,'asia',6),
('TR','Turkey','Istanbul & Cappadocia Honeymoon','350,000','/images/tour4.jpg','7 days · 6 nights',4.9,247,'Honeymoon',false,'middle_east',1),
('AE','UAE','Luxury City & Desert Safari','220,000','/images/tour1.jpg','5 days · 4 nights',4.9,312,'Luxury',false,'middle_east',2),
('AZ','Azerbaijan','Baku Modern City Tour','215,000','/images/tour2.jpg','6 days · 5 nights',4.6,78,'New',false,'middle_east',3),
('EG','Egypt','Pyramids & Nile Cruise','390,000','/images/tour3.jpg','7 days · 6 nights',4.8,165,'History',false,'middle_east',4),
('QA','Qatar','Doha Heritage Luxury','160,000','/images/tour6.jpg','4 days · 3 nights',4.7,92,'Weekend',false,'middle_east',5),
('SA','Saudi Arabia','Al Ula Historical Wonders','410,000','/images/tour4.jpg','5 days · 4 nights',4.9,134,'Premium',false,'middle_east',6)
on conflict do nothing;

insert into visa_cards (code,name,image,price,type,processing,validity,success,is_featured,order_index) values
('UZ','Uzbekistan',       '/images/tour4.jpg','13,000','E-Visa',          '1–3 days',   '30 days', '99%',true, 1),
('MY','Malaysia',         '/images/tour1.jpg','15,000','Tourist Visa',    '5–7 days',   '30 days', '98%',false,2),
('SG','Singapore',        '/images/tour2.jpg','22,000','E-Visa',          '7–10 days',  '30 days', '95%',false,3),
('TH','Thailand',         '/images/tour3.jpg','18,500','Tourist Visa',    '5–7 days',   '60 days', '97%',false,4),
('TR','Turkey',           '/images/tour4.jpg','45,000','Sticker Visa',    '10–15 days', '90 days', '94%',false,5),
('AE','Dubai (UAE)',      '/images/tour6.jpg','35,000','30-Day E-Visa',   '3–5 days',   '30 days', '99%',false,6),
('AZ','Azerbaijan',       '/images/tour1.jpg','12,000','E-Visa',          '3–5 days',   '30 days', '99%',false,7),
('UK','United Kingdom',   '/images/tour2.jpg','65,000','Standard Visitor','15–20 days', '6 months','92%',false,8),
('US','United States',    '/images/tour3.jpg','75,000','B1 / B2 Visa',   '30–45 days', '10 years','88%',false,9)
on conflict do nothing;

insert into visa_countries (code,name,price,order_index) values
('MY','Malaysia',            '15K',1),
('SG','Singapore',           '22K',2),
('AZ','Azerbaijan',          '12K',3),
('KH','Cambodia',            '10K',4),
('AE','United Arab Emirates','35K',5),
('ID','Indonesia',           '14K',6),
('EG','Egypt',               '20K',7),
('LK','Sri Lanka',           '9K', 8),
('TH','Thailand',            '18K',9),
('TR','Turkey',              '45K',10),
('UZ','Uzbekistan',          '13K',11),
('VN','Vietnam',             '17K',12),
('SA','Saudi Arabia',        '25K',13),
('EU','Schengen Area',       '55K',14),
('UK','United Kingdom',      '65K',15),
('CA','Canada',              '70K',16)
on conflict do nothing;

insert into popular_tours (code,country,title,price,image,duration,location,rating,group_size,badge,featured,row,order_index) values
('TH','Thailand',   'Bangkok & Pattaya Beach Escape',      '165,000','/images/travel1.jpg','4 nights','Bangkok • Pattaya',       4.9,12,'Best seller',false,1,1),
('AZ','Azerbaijan', 'Baku Cultural City Tour',              '215,000','/images/travel2.jpg','4 nights','Baku • Gabala',           4.8,15,'Featured',   false,1,2),
('LK','Sri Lanka',  'Colombo, Kandy & Tea Trails',          '175,000','/images/tour3.jpg',  '4 nights','Colombo • Kandy',         4.7,14,'Honeymoon',  false,1,3),
('MV','Maldives',   'All-Inclusive Luxury Resort',          '690,000','/images/tour2.jpg',  '4 nights','Malé • Maafushi',         5.0,8, 'Luxury',     false,1,4),
('UZ','Uzbekistan', 'Tashkent, Samarkand & Bukhara',        '280,000','/images/tour6.jpg',  '7 nights','Tashkent • Samarkand',    4.8,12,'Featured',   true, 2,1),
('TR','Turkey',     'Istanbul & Cappadocia Honeymoon',      '350,000','/images/tour3.jpg',  '6 nights','Istanbul • Cappadocia',   4.9,14,'Hot deal',   false,2,2),
('MY','Malaysia',   'Kuala Lumpur & Genting Highlands',     '185,000','/images/tour4.jpg',  '4 nights','Kuala Lumpur • Genting',  4.6,16,'Family',     false,2,3),
('AE','UAE',        'Dubai City & Desert Safari',            '220,000','/images/tour6.jpg',  '4 nights','Dubai • Abu Dhabi',       4.9,18,'Luxury',     false,2,4)
on conflict do nothing;

insert into home_visa_cards (country,code,type,processing,success,image,order_index) values
('United Kingdom','UK','Visit Visa',      '15–20 working days','94%','/images/travel1.jpg',1),
('United States', 'US','B1 / B2 Visa',   '30–45 working days','88%','/images/travel2.jpg',2),
('Dubai (UAE)',   'AE','30-Day E-Visa',   '3–5 working days',  '99%','/images/umrah.jpg',  3),
('Canada',        'CA','Visitor Visa',    '20–30 working days','91%','/images/tour1.jpg',  4),
('Schengen',      'EU','Multi-Country',   '12–18 working days','92%','/images/tour2.jpg',  5),
('Turkey',        'TR','Sticker Visa',    '10–15 working days','95%','/images/tour3.jpg',  6)
on conflict do nothing;

insert into umrah_packages (tier,title,price,image,nights,hotel,rating,popular,order_index) values
('Economy', '15 Days · Considered',  '195,000', '/images/umrah.jpg', '8N Makkah · 5N Madinah',  '3-star, 800m from Haram',            4.6, false, 1),
('Standard','21 Days · Most chosen', '206,300', '/images/hajj.jpg',  '12N Makkah · 7N Madinah', '4-star, 400m from Haram',            4.8, true,  2),
('Premium', '21 Days · Pullman view','217,600', '/images/tour1.jpg', '12N Makkah · 7N Madinah', '5-star, 200m from Haram',            4.9, false, 3),
('Royal',   '21 Days · Haram-facing','295,200', '/images/tour2.jpg', '12N Makkah · 7N Madinah', 'Hilton / Pullman, Haram view',        5.0, false, 4)
on conflict do nothing;

insert into blog_posts (slug,title,date,category,author,image,excerpt,content) values
('umrah-cost-from-pakistan',
 'How Much Does Umrah Cost from Pakistan?',
 '10 JUL','Blog, Umrah','Travel Air','/images/umrah.jpg',
 'Performing Umrah is a spiritual journey that many Muslims around the world dream of undertaking.',
 'For Pakistani pilgrims, the cost of Umrah can vary based on the time of year and services. 21 Days Umrah Package starts from PKR 224,500 and includes direct flight, visa, hotel and transport.'),
('apply-umrah-visa-pakistan',
 'How to Apply for Umrah Visa from Pakistan',
 '03 JUL','Umrah, Visa','Travel Air','/images/hajj.jpg',
 'For Muslims worldwide, making the Umrah pilgrimage is a spiritually enlightening experience.',
 'Applying for an Umrah visa requires a valid passport, photographs with blue background, and vaccination certificates. We guide you through every step of the process.'),
('umrah-package-from-lahore',
 'Umrah Package from Lahore with Travel Air',
 '28 JUN','Umrah','Travel Air','/images/umrah.jpg',
 'Starting on the spiritual journey of Umrah is a significant milestone for many Muslims.',
 'Lahore provides excellent connectivity for pilgrims with direct flights to Jeddah and Madinah. Our packages include premium lounge access and full Ziyarat transport included.')
on conflict (slug) do nothing;
