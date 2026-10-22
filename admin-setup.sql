-- ============================================================
--  ADMIN USER SETUP
--  Run this in Supabase Dashboard → SQL Editor
--  This creates OR fixes the admin login user.
-- ============================================================

DO $$
DECLARE
  v_user_id uuid;
BEGIN

  -- Check if user already exists
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'info@traveloperations.pk';

  IF v_user_id IS NOT NULL THEN
    -- User exists — confirm email + reset password to make sure it works
    UPDATE auth.users
    SET
      email_confirmed_at  = NOW(),
      encrypted_password  = crypt('Travel123-operation', gen_salt('bf')),
      updated_at          = NOW(),
      raw_app_meta_data   = '{"provider":"email","providers":["email"]}'::jsonb
    WHERE id = v_user_id;

    RAISE NOTICE 'Existing user confirmed and password reset. ID: %', v_user_id;

  ELSE
    -- User does not exist — create from scratch
    v_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      'info@traveloperations.pk',
      crypt('Travel123-operation', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      NOW(),
      NOW()
    );

    -- Create the identity record (required for email/password login)
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object(
        'sub',            v_user_id::text,
        'email',          'info@traveloperations.pk',
        'email_verified', true,
        'provider',       'email'
      ),
      'email',
      'info@traveloperations.pk',
      NOW(),
      NOW(),
      NOW()
    );

    RAISE NOTICE 'New admin user created. ID: %', v_user_id;
  END IF;

END $$;

-- Verify: should return 1 row with email_confirmed_at filled
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'info@traveloperations.pk';
